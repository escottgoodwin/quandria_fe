import React,{Component} from 'react';
import { execute, makePromise } from 'apollo-link';
import gql from 'graphql-tag';
import '../css/App.css';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom'
import { Card, Progress, Segment, Icon  } from 'semantic-ui-react'
import UploadPanel from '../components/UploadPanel'
import PanelCount from '../components/PanelCount'

import axios from 'axios'

class DropZoneUpload extends Component {

    state = {
      progress:0,
      loaded:0,
      percent:0,
      fileUrls:this.props.panels,
      panelcount: this.props.panels.length
    }

    deletePanel = (panelId) => {
      const that = this;

       axios({
          url: process.env.REACT_APP_GRAPHQL_SERVER,
          method: 'post',
          headers: {
            authorization: this.props.token ? `Bearer ${this.props.token}` : "",
          },
          data: {
            query: `
            mutation DeletePanel($panelId:ID!){
              deletePanel(id:$panelId){
                id
              }
            }
              `,
              variables: {panelId:panelId}
            }
        }).then(result => {
          axios({
             url: process.env.REACT_APP_GRAPHQL_SERVER,
             method: 'post',
             headers: {
               authorization: this.props.token ? `Bearer ${this.props.token}` : "",
             },
             data: {
               query: `
               query TestChallenges($testId:ID!){
                 test(id:$testId){
                     id
                     subject
                     testNumber
                     testDate
                     course{
                       id
                       name
                       courseNumber
                     }
                     panels{
                       link
                       id
                     }
                     }
                   }
                 `,
                 variables: {testId:this.props.id}
               }
           }).then(result => {
             let grapqhql_resp = result.request.response
             let panels = JSON.parse(grapqhql_resp)
             let currentPanels = panels.data.test.panels
             console.log(currentPanels)
             that.setState({fileUrls:currentPanels})
           });
    }
  )
}

    onDrop = async (acceptedFiles, rejectedFiles) =>  {
      // Push all the axios request promise into a single array

      const file_total = acceptedFiles.length
      let uploadFiles = 0
      let fileTotalSize = 0
      acceptedFiles.map(file => fileTotalSize += file.size)
      let fileUrls = []

      acceptedFiles.map(file => {

        const unsignedUploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;
        var url = process.env.REACT_APP_CLOUDINARY_URL;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", 'browser_upload');
        formData.append("upload_preset", unsignedUploadPreset); // Replace the preset name with your own

        const config = {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }

        const that = this;
         axios.post(url, formData, config).then(response => {
          const data = response.data;
          const fileURL = data.secure_url // You should store this URL for future references in your app
          const testId = this.props.id
          uploadFiles += 1
          let percent = (uploadFiles / file_total)*100

          that.setState({percent})

         axios({
            url: process.env.REACT_APP_GRAPHQL_SERVER,
            method: 'post',
            headers: {
              authorization: this.props.token ? `Bearer ${this.props.token}` : "",
            },
            data: {
              query: `
              mutation SendLink($testId:ID!,
              $link:String!){
                addPanel(link:$link,
                testId:$testId){
                  link
                  id
                  test{
                    panels{
                      id
                      link
                    }
                  }
                }
              }
                `,
                variables: {testId:testId,link:fileURL}
              }
          }).then(result => {
            let grapqhql_resp = result.request.response
            let panels = JSON.parse(grapqhql_resp)
            let currentPanels = panels.data.addPanel.test.panels
            that.setState({fileUrls:currentPanels})
            that.setState({percent:0})
            that.setState({panelcount:currentPanels.length})
          });

        })

      });

    }

      render() {

        return (
          <div>
          <div style={{padding:"15px"}}>

          <Link  to={{
            pathname: "/test_panels",
            state:
              {
                test_id: this.props.id }
            }} >
            <PanelCount count={this.state.panelcount }/>
          </Link>

          </div>

          <hr/>

          <div >
          <center>
          <div style={{width:"500px",paddingBottom:"25px"}}>
        <Dropzone token={this.props.token} onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                  <Segment placeholder  size='big'>

                    <Icon name='images outline' /><br/>
                    Drop or Choose Files

                  </Segment>

                   :

                  <Segment placeholder  size='big'>

                    <Icon name='images outline'  size='big'/><br/>
                    Drop or Choose Files

                  </Segment>

                }
              </div>

            )
          }
        }

        </Dropzone>
        </div >
        </center>
        </div >
        <div style={{padding:"20"}}>
        <div style={{padding:"20"}}>
        <Progress  percent={this.state.percent} color='teal' /> </div>
        <Card.Group centered>
        {this.state.fileUrls.map(url => <UploadPanel deletePanel={this.deletePanel} key={url.link} {...url}/>)}
        </Card.Group>
    </div>
    </div>

      )
    }

  }


export default DropZoneUpload
