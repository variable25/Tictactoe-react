import {useState} from 'react';

function Playerinfo({initialname,symbol,isActive,onChangeName}){
    const [name, setName] = useState(initialname);
    const [isEditing, setisEditing ] = useState(false);

    function handleEdit(){
        setisEditing(editing => !editing);

        if(isEditing){
            onChangeName(symbol, name);
        }
        
    }

    function handleChange(event){
        setName(event.target.value);
        
    }

    let editContent = <span className="player-name">{name}</span>;

    if(isEditing===true){
        editContent = <input type="text" required value={name} onChange={handleChange}></input>;
        
    }

    return(
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className='player'>
                    {editContent}
                    <span className="player-symbol">{symbol}</span>
                
                </span>
                <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
                
            </li>
        </>
    )
}
export default Playerinfo;