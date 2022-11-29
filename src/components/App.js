import React,{ useState,useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Editor from "./Editor";

function App() {
  const [html, setHtml] = useLocalStorage('html','')
  const [css, setCss] = useLocalStorage('css','')
  const [python, setpython] = useLocalStorage('python','')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${python}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, python])



  return (
    <>
      <div className="pane top-pane">
        <Editor language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml} />

        <Editor language="css"
          displayName="CSS"
          value={css}
          onChange={setCss} />

        <Editor language="python"
          displayName="python"
          value={python}
          onChange={setpython} />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )


}

export default App;
