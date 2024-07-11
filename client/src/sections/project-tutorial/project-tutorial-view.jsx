import React from 'react';
import {Box, Card, CardContent, Container, Link, Tab, Tabs, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {Highlight, Prism, themes} from 'prism-react-renderer';
import PropTypes from 'prop-types';
import {baseUrl} from 'src/utils/apis';

const darkula_theme = themes.dracula;

const codeSnippets = {
    dart: `
  // Import the GenBase package
  import 'package:genbase/genbase.dart';

  Genbase.projectKey = '$projectid';
  Genbase.baseUrl = '$currUrl';
  await Genbase.initialize();

  // Call the API
  `,
};

// Styled components
const StyledCard = styled(Card)(({theme}) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
}));

const CodeContainer = styled(Box)(({theme}) => ({
    padding: theme.spacing(1),
    backgroundColor: '#282a36',
    borderRadius: theme.shape.borderRadius,
    overflow: 'auto',
}));

const CodeSnippet = ({language, code, project_id}) => {
    const edited_code = code.replace('$projectid', project_id.project_id).replace('$currUrl', baseUrl);

    return (
        <Highlight {...Prism.defaultProps} theme={darkula_theme} code={edited_code} language="tsx">
            {({className, style, tokens, getLineProps, getTokenProps}) => (
                <pre className={className} style={{...style, padding: '8px'}}>
          {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                  {line.map((token, key) => (
                      <span key={key} {...getTokenProps({token, key})} />
                  ))}
              </div>
          ))}
        </pre>
            )}
        </Highlight>
    );
};

const CodeTabs = (project_id) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const languages = Object.keys(codeSnippets);

    return (
        <Box>
            <Tabs sx={{
                mb: 1,
            }} value={value} onChange={handleChange}>
                {languages.map((lang, index) => (
                    <Tab label={lang.toUpperCase()} key={index}/>
                ))}
            </Tabs>
            {languages.map((lang, index) => (
                <div key={index} hidden={value !== index}>
                    <CodeContainer>
                        <CodeSnippet language={lang} code={codeSnippets[lang]} project_id={project_id}/>
                    </CodeContainer>
                </div>
            ))}
        </Box>
    );
};

export default function TutorialView({project_id}) {
    return (
        <Container maxWidth style={{marginTop: '18px'}}>
            <StyledCard style={{margin: '0pt'}}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Code Snippets
                    </Typography>
                    <CodeTabs project_id={project_id}/>
                    <Typography variant="body1" margin={{marginTop: '8pt'}}>
                        See more documentation and usage at our GitHub{' '}
                        <Link href="https://github.com/searchX/genbase_frontent" target="_blank" rel="noopener">
                            here
                        </Link>.
                    </Typography>
                </CardContent>
            </StyledCard>
        </Container>
    );
}

TutorialView.propTypes = {
    project_id: PropTypes.string,
};

CodeSnippet.propTypes = {
    language: PropTypes.string,
    code: PropTypes.string,
    project_id: PropTypes.string,
};