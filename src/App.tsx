import { useEffect, useState } from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ClassroomPage from "pages/ClassroomPage";
import ClassroomsPage from "pages/ClassroomsPage";
import { Route, Routes } from "react-router-dom";
import { T_Classroom } from "src/modules/types.ts";
import { Container, Row } from "reactstrap";
import HomePage from "pages/HomePage";
import "./App.css"; // Импорт вашего CSS

function App() {
    const [classrooms, setClassrooms] = useState<T_Classroom[]>([]);
    const [currentClassroom, setSelectedClassroom] = useState<T_Classroom | null>(null);
    const [isMock, setIsMock] = useState(false);

    useEffect(() => {
        if ((window as any).__Tauri__?.tauri) {
          const { invoke } = (window as any).__Tauri__.tauri;
          invoke('create')
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error));
        } else {
          console.error("Tauri не инициализирован.");
        }
      }, []);

    return (
        <div className="wrapper">
            <Header className="header" />
            <main className="main-content">
                <Container className="pt-4">
                    <Row className="mb-3">
                        <Breadcrumbs currentClassroom={currentClassroom} />
                    </Row>
                    <Row>
                        <Routes>
                            <Route
                                path="/"
                                element={<HomePage />}
                            />
                            <Route
                                path="/classrooms/"
                                element={<ClassroomsPage
                                    classrooms={classrooms}
                                    setClassrooms={setClassrooms}
                                    isMock={isMock}
                                    setIsMock={setIsMock}
                                />}
                            />
                            <Route
                                path="/classrooms/:id"
                                element={<ClassroomPage
                                    selectedClassroom={currentClassroom}
                                    setSelectedClassroom={setSelectedClassroom}
                                    isMock={isMock}
                                    setIsMock={setIsMock}
                                />}
                            />
                        </Routes>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default App;