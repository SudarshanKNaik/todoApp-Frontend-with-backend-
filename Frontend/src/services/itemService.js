export const addItemToServer= async (task,date) => {
  try {
    const response = await fetch("http://localhost:3005/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, date }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const serverItem = data && typeof data === 'object' ? (data.item ?? data) : null;
    return mapItemFromServer(serverItem);
  } catch (error) {
    console.error("Error adding item to server:", error);
    return null;
  }
};

const mapItemFromServer = (item) => {
  if (!item || (!item._id && !item.id) || (!item.task && !item.name)) return null;
  return {
    id: item._id ?? item.id,
    name: item.task ?? item.name,
    dueDate: item.date ?? item.dueDate ?? "",
    completed: item.completed ?? false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

export const getAllItemsFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3005/api/todo");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.map(mapItemFromServer).filter(item => item !== null);
  } catch (error) {
    console.error("Error fetching items from server:", error);
    return [];
  }
};

export const markItemCompletedOnServer = async (id) => {
  try {
    const response = await fetch(`http://localhost:3005/api/todo/${id}/completed`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return mapItemFromServer(data.item);
  } catch (error) {
    console.error("Error marking item as completed:", error);
    return null;
  }
};

export const deleteItemFromServer = async (id) => {
  try {
    const response = await fetch(`http://localhost:3005/api/todo/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return mapItemFromServer(data.item);
  } catch (error) {
    console.error("Error deleting item from server:", error);
    return null;
  }
};
