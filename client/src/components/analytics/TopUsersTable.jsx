import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card } from "react-bootstrap";

const TopUsersTable = () => {
  const [users, setUsers] = useState([]);

  token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/analytics/user/avg/", {
      headers: {
        Authorization: `Bearer ${token}`, // JWT token
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.avg_score - a.avg_score);
        setUsers(sorted.slice(0, 5)); // top 5 users
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card className="my-4 shadow-sm">
      <Card.Header className="bg-dark text-white">
        Top 5 Users by Average Score
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive className="text-center">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Attempts</th>
              <th>Average Score (%)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.user}>
                <td><strong>{index + 1}</strong></td>
                <td>{u.user}</td>
                <td>{u.attempts}</td>
                <td>{u.avg_score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TopUsersTable;
