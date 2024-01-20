function Loading(){
    const loadingStyle ={
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    return (
        <div style={loadingStyle}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{fontSize: '6rem'}}/>
        </div>
    )
}

export default Loading;