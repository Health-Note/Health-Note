import { useState } from 'react';
import uuid from 'uuid/v4';

export default initialMembers => {
  const [members, setTodos] = useState(initialMembers);

  return {
    members,
    addTodo: newMember => {
      setTodos([...members, { id: uuid(), name: newMember, completed: false }]);
    },
    ToggleTodo: member_id => {
      const updatedMember = members.map(member =>
        member_id === member.id
          ? { ...member, completed: !member.completed }
          : member
      );
      setTodos(updatedMember);
    },
    removeTodo: member_id => {
      setTodos(members.filter(member => member_id !== member.id));
    },
    EditTodo: (member_id, fixedName) => {
      const editedMembers = members.map(member =>
        member_id === member.id ? { ...member, name: fixedName } : member
      );
      setTodos(editedMembers);
    },
  };
};
