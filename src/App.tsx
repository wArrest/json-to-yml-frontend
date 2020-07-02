import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";
import "./App.css"
import {Result} from "./index";
import { URL, Request } from './utlis/request';
import { WebSocketTest } from './utlis/util';

interface IProps {
}

interface IState {
  jsonContent: string
  jsonParseError: string
  yamlContent: string
  yamlParseError: string
  yamlList: Array<object>
}

class App extends React.PureComponent<IProps, IState> {
  state: IState
  baseUrl = "http://arrest.site/api/convert"

  constructor(props: IProps) {
    super(props)
    this.state = {
      jsonContent: '',
      jsonParseError: '',
      yamlContent: '',
      yamlParseError: '',
      yamlList: []
    };
  }

  componentWillMount() {
    WebSocketTest();
    let that = this;
    Request(
      {
        url: URL.getYml,
        method: 'get'
      },
      function(res: any) {
        that.setState({
          ...that.state,
          yamlList: res.data.detail
        })
      }
    );
  }


  //TODO 两个方法需要封装成一个，事件传参写不来了，卧槽
  //TODO 还需添加语法报错需要的样式
  async getConvertedText(text: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('text', text);
    const res = await fetch(this.baseUrl, {
      method: "post",
      body: params
    }).then((r) => (
      r.json()
    ))

    return res
  }

  //格式化json字符串
  getFormatJson(json: string) {
    let jsonObj
    try {
      jsonObj = JSON.parse(json)
      let jsonString = JSON.stringify(jsonObj, null, "\t")
      return jsonString
    } catch (e) {
      throw e
    }
  }

  async onJsonChange(newValue: any) {
    if (newValue.length === 0) {
      this.setState({...this.state, jsonContent: '', yamlContent: '', jsonParseError: ''})
      return
    }
    const result: Result = await this.getConvertedText(newValue)
    try {
      let json = this.getFormatJson(newValue)
      this.setState({...this.state, jsonParseError: ''})
      this.setState({...this.state, yamlContent: result.text, jsonContent: json})
    } catch (e) {
      this.setState({...this.state, jsonContent: newValue})
      this.setState({...this.state, jsonParseError: e.toString()})
    }
  }

  async onYamlChange(newValue: any) {
    if (newValue.length === 0) {
      this.setState({...this.state, jsonContent: '', yamlContent: ''})
      return
    }
    const result: Result = await this.getConvertedText(newValue)
    try {
      let json = this.getFormatJson(result.text)
      this.setState({...this.state, jsonParseError: ''})
      this.setState({...this.state, yamlContent: newValue, jsonContent: json})
    } catch (e) {
      this.setState({...this.state, yamlContent: newValue})
    }
  }

  async onFileClick(event: any) {
    const link = event.target.getAttribute('data-url');
    let that = this;
    Request(
      {
        url: URL.getDetail + '?yaml_path=' + link,
        method: 'get'
      },
      function(res: any) {
        that.setState({
          ...that.state,
          jsonContent: JSON.stringify(res.data.detail)
        });
        that.onJsonChange(that.state.jsonContent);
      }
    );
  }

  render() {
    const {yamlList} = this.state;
    return (
      <div className="App">
        <div className="info">

          <br/>
          {
            yamlList.map((item: object) => {
              for (const key in item) {
                return (
                  <p
                    className="yml-item"
                    data-url={item[key]}
                    onClick={this.onFileClick.bind(this)}
                  >{key}</p>
                )
              }
            })
          }
          <h2>JSON和YML在线转换</h2>
          <br/>
          <p>无聊的在线小项目，源码可参考 <a href="https://github.com/wArrest/json-to-yml-frontend" target="_blank">github库</a></p>
          <div className="title-content">
            <h3>YAML:</h3>
            <p>
              <strong>YAML (YAML Ain't a Markup Language)</strong>
              YAML不是一种标记语言，通常以
              <code>.yml</code>
              为后缀的文件，是一种直观的能够被电脑识别的数据序列化格式，并且容易被人类阅读，容易和脚本语言交互的，可以被支持YAML库的不同的编程语言程序导入，一种专门用来写配置文件的语言。可用于如：
              <code>Java</code>，
              <code>C/C++</code>，
              <code>Ruby</code>，
              <code>Python</code>，
              <code>Perl</code>，
              <code>C#</code>，
              <code>PHP</code>等。
            </p>
          </div>
          <div className="title-content">
            <h3>JSON:</h3>
            <p>
              <strong>JSON(JavaScript Object Notation)</strong>
              是一种轻量级的数据交换格式，它基于
              <code>JavaScript</code>
              的一个子集，易于人的编写和阅读，也易于机器解析。
              JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括
              <code>C</code>，
              <code>C++</code>，
              <code>C#</code>，
              <code>Java</code>，
              <code>JavaScript</code>，
              <code>Perl</code>，
              <code>Python</code>等）。
              这些特性使JSON成为理想的数据交换语言。
            </p>
          </div>
        </div>
        <div className="json-editor"><h2>JSON <span>{this.state.jsonParseError}</span></h2>
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
        <div className="yml-editor"><h2>YAML <span>{this.state.yamlParseError}</span></h2>
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
