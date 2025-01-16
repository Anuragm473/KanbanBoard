import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
import { getBoards } from "./utility/IndexedDB"; // Import your IndexedDB helper
import { setBoardActive, addBoard } from "./redux/boardsSlice"; // Import addBoard properly

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state for async operation
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    // Fetch initial boards data from IndexedDB
    const fetchBoards = async () => {
      const storedBoards = await getBoards(); // Get boards from IndexedDB
      if (storedBoards && storedBoards.length > 0) {
        storedBoards.forEach((board) => dispatch(addBoard(board))); // Dispatch each board to Redux
      }
      setIsLoading(false); // Set loading to false once boards are loaded
    };

    fetchBoards();
  }, [dispatch]);

  // Set active board if none is active
  useEffect(() => {
    if (boards.length > 0 && !boards.some((board) => board.isActive)) {
      dispatch(setBoardActive({ index: 0 }));
    }
  }, [boards, dispatch]);

  if (isLoading) {
    // Show a loading spinner while IndexedDB data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
          <Home
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default App;
