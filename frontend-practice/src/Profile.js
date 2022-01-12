import React from 'react'

const profile = ({picture, Name, Age, disp}) => {
    return (
        <article style={{display: disp, gridTemplateColumns: "auto 1fr", columnGap: "0.75rem", marginBottom: "1.5rem", alignItems: "center"}}>
            <img src={picture} alt="profile" style={{width: "75px", height: "75px", objectFit: "cover", borderRadius: "50%", }}/>
            <div>
                <h4>
                    {Name}
                </h4>
                <p>
                    {Age}
                </p>
            </div>
        </article>
    )
}

export default profile
