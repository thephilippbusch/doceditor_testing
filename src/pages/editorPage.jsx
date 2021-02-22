import React, { useState } from 'react';
import styled from 'styled-components';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../styles/rich_editor.css';
import parse from 'html-react-parser';
import AceEditor from 'react-ace';
import fileDownload from 'react-file-download';
import LoadPDFViewer from '../loader/loadPDFViewer';

import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-monokai";

import {
    Box,
    Text,
    Header,
    Button,
    DropButton,
    Layer,
    TextInput
} from 'grommet';

import {
    Next as NextIcon,
    Previous as PreviousIcon,
    Test
} from 'grommet-icons'

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
    width: 100%;
    height: 100%;

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

    const [editorWidth, setEditorWidth] = useState("49.5%");
    const [viewerWidth, setViewerWidth] = useState("49.5%");
    const [showEditorBtn, setShowEditorBtn] = useState(true);
    const [showViewerBtn, setShowViewerBtn] = useState(true);
    const [fullview, setFullview] = useState(true);
    const [currentView, setCurrentView] = useState("editor");

    const [showLayer, setShowLayer] = useState(false);
    const [texFilename, setTexFilename] = useState('');
    const [fileNameError, setFileNameError] = useState('');
    var editor = null;

    const handleViewerHide = () => {
        setFullview(false)
        setViewerWidth("0%")
        setEditorWidth("99%")
        setCurrentView("editor")
    }

    const handleEditorHide = () => {
        setFullview(false)
        setEditorWidth("0%")
        setViewerWidth("99%")
        setCurrentView("viewer")
    }

    const resetWidth = () => {
        setEditorWidth("49.5%")
        setViewerWidth("49.5%")
        setFullview(true);
    }

    const test = () => {
        console.log(editorState)
    }

    const latexCompiler = () => {
        console.log(editorState);
        // const pdf = latex(editorState, {cmd: "pdflatex"});

        fileDownload(editorState, 'test.tex');
    }

    const saveTexFile = () => {
        if(texFilename === "") {
            setFileNameError('Please enter a File Name!');
        } else {
            let fullFilename = `${texFilename}.tex`;
            fileDownload(editorState, fullFilename);
            setShowLayer(false);
        }
    }

    return(
        <EditorContainer>
            <Box with="100%" justify="around" direction="row">
                <Box width={editorWidth} background="text-weak" height="91vh">
                    {showLayer && (
                        <Layer
                            onEsc={() => setShowLayer(false)}
                        >
                            <Box pad="medium" background="background-front" round="5px">
                                <Box 
                                    direction="row" 
                                    justify="start" 
                                    width="100%" 
                                    align="center"
                                    margin={{vertical: "medium"}}
                                >
                                    <TextInput
                                        plain
                                        width="small"
                                        placeholder="somefile"
                                        label="Filename"
                                        value={texFilename}
                                        onChange={e => setTexFilename(e.target.value)}
                                    />
                                    <Text>.tex</Text>
                                </Box>
                                <Box direction="row" justify="around">
                                    <Button 
                                        primary
                                        label="Confirm"
                                        onClick={saveTexFile}
                                    />
                                    <Button
                                        secondary
                                        label="Cancel"
                                        onClick={() => setShowLayer(false)}
                                    />
                                </Box>
                                <Box margin={{vertical: "small"}} direction="row" justify="center">
                                    <Text size="small" color="status-critical">{fileNameError}</Text>
                                </Box>
                            </Box>
                        </Layer>
                    )}
                    <Header>
                        <Box>
                            <DropButton
                                primary
                                borderradius="0px"
                                label="Action"
                                dropAlign={{ top: 'bottom', right: 'right' }}
                                dropContent={
                                    <Box background="light-2">
                                        <Button label="New"/>
                                        <Button label="Save"/>
                                        <Button primary label="Export" onClick={() => setShowLayer(true)}/>
                                    </Box>
                                }
                            />
                        </Box>
                    </Header>
                    <TexEditor>
                        <div className="texBody">
                            <AceEditor
                                placeholder="Start typing..."
                                mode="latex"
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
                                    wrap: true,
                                    indentedSoftWrap: false,
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                    tabSize: 4,
                                }}
                            />
                        </div>
                    </TexEditor>
                </Box>
                <Box width="1%" background="text-xweak" height="91vh" direction="column" justify="center">
                    {fullview ? (
                        <Box height="xsmall" justify="around">
                            <Button onClick={handleViewerHide}>
                                <NextIcon size="small"/>
                            </Button>
                            <Button onClick={handleEditorHide}>
                                <PreviousIcon size="small"/>
                            </Button>
                        </Box>
                    ) : (
                        (currentView === "viewer") ? (
                            <Button onClick={resetWidth}>
                                <NextIcon size="small"/>
                            </Button>
                        ) : (
                            <Button onClick={resetWidth}>
                                <PreviousIcon size="small"/>
                            </Button>
                        )
                    )}
                </Box>
                <Box width={viewerWidth} background="text" height="91vh">
                    <Header>
                        <Button primary label="Compile" onClick={() => latexCompiler()}/>
                    </Header>
                    <Box overflow={{vertical: "scroll"}} direction="row" justify="center" pad="xsmall">
                        <LoadPDFViewer />
                    </Box>
                </Box>
            </Box>


            {/*
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
            */}
        </EditorContainer>
    )
}

export default EditorPage;