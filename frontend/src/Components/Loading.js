function Loading(){
    const loadingStyle ={
        'margin-top': 'auto',
        'margin-left': 'auto',
        'margin-right': 'auto'
    }

    return (
        <div style={loadingStyle}>
            <i class="fa-solid fa-circle-notch fa-spin" style={{fontSize: '6rem'}}/>
        </div>
    )
}

export default Loading;