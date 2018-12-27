import React from 'react';
import '../css/App.css';
import { Tab, Image, Icon, Grid, Comment, Form, Divider, Input } from 'semantic-ui-react'
const ChallengeSection = (props) =>

<Tab.Pane key={props.id}>

<Grid columns={2} style={{padding:'30px'}}>
<Grid.Row>
<Grid.Column>
<div style={{textAlign: 'left'}}>
<div style={{width:"75%"}}>
<div>
<b>Challenge:</b> {props.challenge}
</div>
<div>
<b>By:</b> {props.addedBy.firstName} {props.addedBy.lastName}
</div>
<div><b>Answer Given:</b>
{
props.question.questionAnswers.filter(a => a.addedBy.id === props.addedBy.id)[0].answer.choice
} </div>

<div style={{padding:'10px'}}>
<div>
<b>Question:</b> {props.question.question}
</div>
<div>

<ul>
{
  props.question.choices.map(choice => <li key={choice.choice}>{choice.choice} {choice.correct &&  <Icon  size='large' name='check square outline' color='teal' />} </li>)

}
</ul>
</div>
<div><b>By:</b> {props.question.addedBy.firstName} {props.question.addedBy.lastName}
</div>
</div>

<div>
<Image size="medium" src={props.question.panel.link} />
</div>
</div>
</div>
</Grid.Column>

<Grid.Column>
<div style={{ maxWidth: '100%', minHeight: 375, padding: '15px', textAlign:"left"}}>
<Comment.Group>

    <Comment >

      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text ><div >How artistic!</div></Comment.Text>

      </Comment.Content>
    </Comment>


    <Comment>
        <Comment.Content>
        <Comment.Author as='a'> Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>

        <Comment.Text >
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>

      </Comment.Content>

    </Comment>



    <Comment>
        <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>

      </Comment.Content>
    </Comment>


    <Comment>
        <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>

      </Comment.Content>
    </Comment>


    <Comment>
        <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>

      </Comment.Content>
    </Comment>

    <Comment>
        <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>

      </Comment.Content>
    </Comment>


    <Form reply>
      <Input  action={{ color: 'teal', content: 'Submit' }}
    actionPosition='right'
    placeholder='Comment...'
    />
    </Form>
  </Comment.Group>
</div>
</Grid.Column>
</Grid.Row>

</Grid>
<Divider vertical />
</Tab.Pane>


export default ChallengeSection
