import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onCompleteClick }) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onCompleteClick={onCompleteClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;
