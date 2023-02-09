import React from "react";
import "../css/form.css"


export class FormComponent extends React.Component<any, any>{


    render() {
        const { title, data, onSubmit } = this.props
        return <>
            <div className="form-layout">
                <div className="form-title-layout">
                    <h3>{title}</h3>
                    <h4>Back</h4>
                </div>
                <div className="form-data-layout">
                    <form action='' target="_self" className='form'>
                        <div className="form-element">
                            <label>Name :</label>
                            <input type="text" />
                        </div>
                        <div className="form-element">
                            <label>Age :</label>
                            <input type="text" />
                        </div>
                        <div className="form-element">
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>

        </>
    }
}