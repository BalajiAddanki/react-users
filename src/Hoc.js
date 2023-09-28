import React from 'react';

const Hoc = (Component) => {
    return (
        class extends React.Component {
            state = {
                auth: true
            }
            render() {
                return (
                    <div>
                        {this.state.auth ? <Component name="Aravind" /> : <h1>Login Required</h1>}
                    </div>
                )
            }
        }
    )

}

export default Hoc;