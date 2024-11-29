import React, { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ContextMenuProps {
    children: ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
        setVisible(true);
    };

    const handleClick = () => {
        setVisible(false);
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const styles = {
        contextMenu: {
            position: "absolute" as "absolute",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            animation: "fadeIn 0.3s ease",
            zIndex: 1000,
        },
        contextMenuItem: {
            padding: "8px 12px",
            cursor: "pointer",
        },
        contextMenuItemHover: {
            backgroundColor: "#f0f0f0",
        },
        fadeIn: `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `,
    };

    return (
        <div onContextMenu={handleContextMenu} style={{ width: "100%", height: "100vh" }}>
            <style>{styles.fadeIn}</style>
            {children}
            {visible && createPortal(
                <div
                    ref={menuRef}
                    style={{ ...styles.contextMenu, top: position.y, left: position.x }}
                >
                    <div style={styles.contextMenuItem}>View</div>
                    <div style={styles.contextMenuItem}>Delete</div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default ContextMenu;