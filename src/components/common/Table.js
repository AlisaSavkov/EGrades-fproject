import React, { Component } from 'react';
import '../../style/common/table.css';

class Table extends Component {
  
    render() {
        return (
            <div>
            {
                this.props.data && 
                <table className="timecard">
                    <thead>
                        <tr>
                        {
                            this.props.heading.map((item, index)=>{
                                return (
                                    <th key={index}>{item}</th>
                                )
                            })
                        }
                        </tr>     
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(item => {
                                return (
                                    <tr key={item.ID}>
                                    {
                                        // Radi samo ukoliko nema podobjekata, lista objekata ...
                                        Object.entries(item).map(entry => (
                                            <td key={entry[1]}>{entry[1]}</td>
                                        ))
                                    }
                                    {
                                        this.props.buttons.map(btn => (
                                            <td key={btn.name}><button className={btn.class} onClick={()=>btn.action(item.ID)}>{btn.name}</button></td>
                                        ))
                                    }    
                                    </tr>
                                )
                            })
                        }

                    </tbody>
              </table>
            }                    
        </div>
        )
    }
};

export default Table;