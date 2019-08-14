import { useState } from 'react';
import uuid from 'uuid/v4';

export default initialMembers => {
    
    const [members, setTodos] = useState(initialMembers);

    return{
        members,
        addTodo: newMember => {
            setTodos([...members, {id: uuid(), name: newMember, completed: false}]);
        },
        ToggleTodo: memberId => {
            const updatedMember = members.map(member => memberId === member.id ? { ...member, completed: !member.completed } : member);
            setTodos(updatedMember);
        },
        removeTodo: memberId => {
            setTodos(members.filter(member => memberId !== member.id));
        },
        EditTodo: (memberId, fixedName) => {
            const editedMembers= members.map(member => memberId === member.id? {...member, name: fixedName} : member);
            setTodos(editedMembers);
        }
    }

}