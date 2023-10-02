// "use client";
// import { PropsWithChildren, createContext, useContext, useState } from "react";

// interface IHuman3DContext {
//   selectedBodyPart: string[];
//   addBodyPart: (bodyPart: string) => void;
// }

// const Human3DContext = createContext<IHuman3DContext>({
//   selectedBodyPart: [],
//   addBodyPart: () => {},
// });

// export const Human3DProvider = ({ children }: PropsWithChildren) => {
//   const [selectedBodyPart, setSelectedBodyPart] = useState<string[]>([]);

//   function addBodyPart(bodyPart: string) {
//     if (selectedBodyPart.includes(bodyPart)) {
//       setSelectedBodyPart((prevSelectedParts) =>
//         prevSelectedParts.filter((part) => part !== bodyPart)
//       );
//       return;
//     }

//     setSelectedBodyPart((prevSelectedParts) => [
//       ...prevSelectedParts,
//       bodyPart,
//     ]);
//   }

//   return (
//     <Human3DContext.Provider
//       value={{
//         selectedBodyPart,
//         addBodyPart,
//       }}
//     >
//       {children}
//     </Human3DContext.Provider>
//   );
// };

// export const useHuman3D = () => {
//   return useContext(Human3DContext);
// };
