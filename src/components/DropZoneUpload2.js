import React,{Component} from 'react';

import '../css/App.css';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom'
import { withApollo } from 'react-apollo';
import { Card, Progress, Segment, Icon  } from 'semantic-ui-react'
import UploadPanel from '../components/UploadPanel'
import PanelCount from '../components/PanelCount'
import axios from 'axios'

import {TEST_PANEL_STATS_QUERY, ADD_PANEL_MUTATION} from '../ApolloQueries'

class DropZoneUpload extends Component {

    state = {
      progress:0,
      loaded:0,
      percent:0,
      fileUrls:this.props.panels,
      panelcount: this.props.panels.length
    }


    onDrop = async (acceptedFiles, rejectedFiles) =>  {
      // Push all the axios request promise into a single array

      const file_total = acceptedFiles.length
      let uploadFiles = 0

      const unsignedUploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;
      var url = process.env.REACT_APP_CLOUDINARY_URL;

      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }

      let uploadsUrls = []

      acceptedFiles.map(file => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", 'browser_upload');
        formData.append("upload_preset", unsignedUploadPreset); // Replace the preset name with your own

        axios.post(url, formData, config).then(response => {
          uploadUrls.push(response.data.secure_url)
        })

        uploadFiles += 1
        let percent = (uploadFiles / file_total)*100
        that.setState({percent})
      })

        this.props.client.mutate({
        mutation: ADD_PANELS_MUTATION,
        variables: {uploadUrls:uploadUrls,testId:this.props.id},
        refetchQueries: {() => { return [{
            query: TEST_PANEL_STATS_QUERY,
            variables: { testId: this.props.id }
          }]
        }}
      })

    }

      render() {

        return (

      <Query query={PANEL_QUERY} variables={{ test_id: this.props.id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error}/>

              const testToRender = data.test

          return (
            <div>

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

        <AddPanelList percent={this.state.percent} test_id={this.props.id}/>
    </div>
  )
  }


  }
  </Query>
      )
    }

  }


export default withApollo(DropZoneUpload)
