import * as React from "react"
const TickIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="#0060F0"
            d="M8 0C3.592 0 0 3.592 0 8c0 4.408 3.592 8 8 8 4.408 0 8-3.592 8-8 0-4.408-3.592-8-8-8Zm3.824 6.16-4.536 4.536a.6.6 0 0 1-.848 0L4.176 8.432a.604.604 0 0 1 0-.848.604.604 0 0 1 .848 0l1.84 1.84 4.112-4.112a.604.604 0 0 1 .848 0 .604.604 0 0 1 0 .848Z"
        />
    </svg>
)
export default TickIcon
