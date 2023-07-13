"use client"
import { useState, useEffect } from "react";

interface Character {
    id?: string;
    name: string;
    class: string;
    dateOfCreation: string;
    spec: string;
  }
  
  interface PageProps {
    data: Character[];
  }
  
//   const Page: React.FC<PageProps> = ({ data }) => {
//     return (
//       <div>
//         {data.map((item) => (
//           <div>{item.Name}</div>
//         ))}
//       </div>
//     );
//   };
  
//   export async function getServerSideProps() {
//     const res = await fetch('https://localhost:7178/Character');
//     const data: Character[] = await res.json();
  
//     return { props: { data } };
//   }
  
//   export default Page;

function Page() {
    const [data, setData] = useState<Character[] | null>(null);
  
    useEffect(() => {
      fetch('https://localhost:7178/Character')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }, []);
  
    return (
        <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Spec</th>
                  <th>Date of Creation</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.class}</td>
                    <td>{item.spec}</td>
                    <td>{item.dateOfCreation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      );
    }
  
  export default Page;
  