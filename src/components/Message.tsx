type MessageProps = {
    text: string;
    color?: string;
}

function Message(props: MessageProps){

    const {text, color} = props;
    //
    console.log("Message props: ", props);

    return (
        <div>
            <h4 style={{color: color}}>Message : {text}</h4>
            <p>This is a functional component</p>
            <p>Generated at {new Date().toLocaleString()}</p>
        </div>
    );
}

export default Message;