import React from 'react'

function Alert({ alert }) {
    return (
        alert !== null && (
        <div>
            {alert.msg}
        </div>
    )
    )
}

export default Alert
