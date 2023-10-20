

interface props {
    id: string,
    user: {
        displayname: string
    },
    city: string,
    province: string,
    price: any
}

const Card = (props: props) => {
    return (
        <div key={props.id} className="relative flex justify-center overflow-hidden py-4">
            <div className="flex h-24 w-96 flex-row rounded-lg bg-zinc-200">
                <div className="px-2 pt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-20 w-16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
                <div className="w-60 pl-2">
                    <h1 className="pt-4 text-xl">{props.user.displayname}</h1>
                    <div className="flex flex-row pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span key={props.id} className="text-xs">{props.city}, {props.province}</span>
                    </div>
                </div>
                <div>
                    <div className="my-4 h-16 w-1 rounded-lg bg-zinc-300"></div>
                </div>
                <div className="flex flex-col text-center text-xs pl-3 justify-center -mt-2">
                    <p>Price:</p>
                    <span>{props.price}</span>
                </div>
            </div>
        </div>



    )
}

export default Card