const WithError = (Component, error="") => {
    if (error) return <p>error</p>;
    return (props) => {<Component {...props}/>};
}

export default WithError;