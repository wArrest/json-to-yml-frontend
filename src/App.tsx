import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";
import "./App.css"

interface IProps {
}

interface IState {
  jsonContent: string
  yamlContent: string
}

class App extends React.PureComponent<IProps, IState> {
  state: IState
  baseUrl = "http://arrest.site/api/convert"

  constructor(props: IProps) {
    super(props)
    this.state = {
      jsonContent: '',
      yamlContent: ''
    }
  }


  //TODO 两个方法需要封装成一个，事件传参写不来了，卧槽
  //TODO 还需添加语法报错需要的样式
  async onJsonChange(newValue: any) {

    const params = new URLSearchParams();
    params.append('text', newValue);
    const res = await fetch(this.baseUrl, {
      method: "post",
      body: params
    }).then((r) => (
      r.json()
    ))

    this.setState({...this.state, yamlContent: res.text, jsonContent: newValue})

  }

  async onYamlChange(newValue: any) {
    const params = new URLSearchParams();
    params.append('text', newValue);
    const res = await fetch(this.baseUrl, {
      method: "post",
      body: params
    }).then((r) => (
      r.json()
    ))
    this.setState({...this.state, yamlContent: newValue, jsonContent: res.text})

  }

  render() {
    return (
      <div className="App">
        <div className="info">
          <br/>
          <h2>JSON和YML在线转换</h2>
          <br/>
          <p>无聊的在线小项目，源码可参考 <a href="https://github.com/wArrest/json-to-yml-frontend">github地址</a></p>

          <h3>YAML:</h3>
          <p>YAML (YAML Ain't a Markup
            Language)YAML不是一种标记语言，通常以.yml为后缀的文件，是一种直观的能够被电脑识别的数据序列化格式，并且容易被人类阅读，容易和脚本语言交互的，可以被支持YAML库的不同的编程语言程序导入，一种专门用来写配置文件的语言。可用于如：
            Java，C/C++, Ruby, Python, Perl, C#, PHP等。</p>
          <h3>JSON:</h3>
          <p>
            JSON(JavaScript Object Notation)是一种轻量级的数据交换格式，它基于JavaScript的一个子集，易于人的编写和阅读，也易于机器解析。
            JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。 这些特性使JSON成为理想的数据交换语言。
          </p>
        </div>
        <div className="json-editor"><h2>JSON</h2>
          <AceEditor
            placeholder="输入json文本"
            mode="json"
            theme="monokai"
            name="json-editor-input"
            onChange={this.onJsonChange.bind(this)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.jsonContent}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}/>

        </div>
        <div className="yml-editor"><h2>YAML</h2>
          <AceEditor
            placeholder="输入yaml文本"
            mode="yaml"
            theme="monokai"
            name="yml-editor-input"
            onChange={this.onYamlChange.bind(this)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.yamlContent}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </div>
      </div>

    )
  }

}

export default App;
