import React, { useState } from 'react';
import styled from 'styled-components';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../styles/rich_editor.css';
import parse from 'html-react-parser';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const EditorContainer = styled.div`
    width: 100%;
    height: 100%;

    .header {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: hsl(255, 3%, 18%);
        padding: 5px 0px 5px 0px;

        .left {
            width: 44%;
            display: flex;
            justify-content: space-between;

            .buttonGroup {
                
            }

            .radioGroup {
                display: flex;
                justify-content: space-around;

                .formLabel {
                    color: white;
                }
            }
        }

        .right {
            width: 50%;
            display: flex;
            justify-content: flex-start;
        }
    }

    .body {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
    }
`;

const PdfViewer = styled.div`
    width: 50%;
    height: 87vh;
    background-color: rgb(230, 230, 230);
    
    .pdfHeader {
        height: 4vh;
        background-color: hsl(270, 1%, 29%);
        border: 1px hsl(300, 1%, 22%) solid;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        p {
            margin-left: 20px;
            font-weight: bold;
            font-size: 16px;
            color: white;
        }
    }

    .pdfContent {
        padding: 10px;
    }
`;

const TexEditor = styled.div`
    width: 50%;
    height: 83vh;

    .texHeader {
        height: 4vh;
        background-color: hsl(270, 1%, 29%);
        border: 1px hsl(300, 1%, 22%) solid;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        p {
            margin-left: 20px;
            font-weight: bold;
            font-size: 16px;
            color: white;
        }
    }

    .texBody {
        height: 100%;
        width: 100%;

        .aceEditor {

        }
    }
`;

const RichEditor = styled.div`
    width: 50%;
    height: 87vh;
    background-color: white;

    .ckeditor {
        height: 100%;
    }
`;

const EditorPage = () => {
    const [currentEditor, setCurrentEditor] = useState('rich');
    const [editorState, setEditorState] = useState('');
    var editor = null;



    return(
        <EditorContainer>
            <div className="header">
                <div className="left">
                    <div className="buttonGroup">
                        <ButtonGroup color="secondary" variant="contained" aria-label="contained primary button group">
                            <Button>New</Button>
                            <Button>Save</Button>
                            <Button>Export</Button>
                        </ButtonGroup>
                    </div>
                    <div className="radioGroup">
                        <RadioGroup>
                            <FormControlLabel
                                checked={currentEditor === 'tex'}
                                onChange={e => setCurrentEditor(e.target.value)}
                                value="tex"
                                label="Tex"
                                name="tex-radio-btn"
                                control={<Radio />}
                                className="formLabel"
                            />
                            <FormControlLabel
                                checked={currentEditor === 'rich'}
                                onChange={e => setCurrentEditor(e.target.value)}
                                value="rich"
                                label="Rich-Text"
                                name="rich-radio-btn"
                                control={<Radio />}
                                className="formLabel"
                            />
                        </RadioGroup>
                    </div>
                </div>
                <div className="right">
                    <ButtonGroup color="secondary" variant="contained" aria-label="contained primary button group">
                        <Button>Compile</Button>
                        <Button>Export</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="body">
                {(currentEditor === "tex") ? (
                    <TexEditor>
                        <div className="texHeader">
                            <p>Tex-Code:</p>
                        </div>
                        <div className="texBody">
                        <AceEditor
                            placeholder="Start typing..."
                            mode="html"
                            theme="monokai"
                            name="TexEditor"
                            width='100%'
                            height='100%'
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            onChange={(val) => {
                                setEditorState(val)
                            }}
                            value={editorState}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                        </div>
                    </TexEditor>
                ) : (
                    <RichEditor>
                        <CKEditor
                            onReady={ editor => {
                                console.log( 'Editor is ready to use!', editor );
        
                                // Insert the toolbar before the editable area.
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                    editor.ui.view.toolbar.element,
                                    editor.ui.getEditableElement()
                                );
        
                                editor = editor;
                            } }
                            onError={ ( { willEditorRestart } ) => {
                                // If the editor is restarted, the toolbar element will be created once again.
                                // The `onReady` callback will be called again and the new toolbar will be added.
                                // This is why you need to remove the older toolbar.
                                if ( willEditorRestart ) {
                                    this.editor.ui.view.toolbar.element.remove();
                                }
                            } }
                            editor={ DecoupledEditor }
                            data={editorState}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorState(data);
                            }}
                            
                        />
                    </RichEditor>
                )}
                <PdfViewer>
                    <div className="pdfHeader">
                        <p>PDF-Viewer:</p>
                    </div>
                    <div className="pdfContent">
                        {parse(editorState)}
                    </div>
                </PdfViewer>
            </div>
        </EditorContainer>
    )
}

export default EditorPage;