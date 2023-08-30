import { thead } from "../../assets/thead"
import "../../styles/menu.scss"


export const Menu = ({ onClick, onShowpop }) => {
    const header = thead

    const handleClick = (id) => {
        onClick(id)
        onShowpop(true)
    }

    return (
        <div className="menu">
            {header.map((head, index) => (
                <div className="menu-unit" key={`head${index}`} onClick={() => handleClick(head.id)}>
                    {head.name}
                </div>
            ))}
        </div>
    )
}