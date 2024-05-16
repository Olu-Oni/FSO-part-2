const Notification = ({message, name}) => {
    if (message === null){
        return null
    }else if (message === `Information of ${name} has already been removed from server` ){
        
        return<div className="errorMessage">
            {message}
        </div>
    }
    return (
        <div className="message">
            {message}
        </div>
    )
}

export default Notification