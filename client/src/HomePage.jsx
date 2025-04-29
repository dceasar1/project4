import React, { useEffect, useState } from "react";
import "./homepage.css";

const data = {
  Science: [
    "What is the theory of relativity?",
    "How does gravity work?",
    "What is quantum physics?",
    "What is the speed of light?",
    "How do black holes form?",
  ],
  History: [
    "What caused World War I?",
    "Who was the first president of the United States?",
    "What was the significance of the Roman Empire?",
    "How did the Industrial Revolution change the world?",
    "What were the main causes of the French Revolution?",
  ],
  Technology: [
    "What is artificial intelligence?",
    "How do computers process data?",
    "What is the difference between machine learning and deep learning?",
    "How do blockchain and cryptocurrency work?",
    "What is cloud computing?",
  ],
  Literature: [
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the meaning of George Orwell's '1984'?",
    "Who are the most famous poets of the 20th century?",
    "What are the main themes of 'Moby Dick'?",
    "What is postmodern literature?",
  ],
  Art: [
    "What are the different types of visual art?",
    "Who painted the 'Mona Lisa'?",
    "What is the meaning of abstract art?",
    "How did the Renaissance influence modern art?",
    "What is the significance of Van Gogh's 'Starry Night'?",
  ],
};

const HomePage = ({ user, setUser }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="page-title">School of Arts</h1>
      <main className="home-content">
        <ul className="categories">
          {Object.keys(data)?.map((category) => (
            <li key={category} onClick={() => setCategory(data[category])}>
              {category}
            </li>
          ))}
        </ul>
        <div className="container">
          {!category && <h2>Select a category to view its questions</h2>}
          {category && (
            <ul>
              {category.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
