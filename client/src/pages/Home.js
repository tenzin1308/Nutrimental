import React from 'react'

export default function Home() {
    return (
            <div className="shadow"> {/* <!-- encapsulates the entire block --> */}
                <div className="p-4">
                    <h1 className="flex justify-center py-8 sm:px-6 lg:px-8 w-auto sm:mx-24 md:mx-44 lg:mx-44">
                        <p className=" text-5xl">Welcome</p></h1>
                </div>

                {/* <!-- Top row of image (left) and text (right) --> */}
                <div className="flex justify-center py-8 sm:px-6 lg:px-8 w-auto sm:mx-24 md:mx-44 lg:mx-44">
                    <div className="">
                        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full`}>
                            <img src="https://healthyfitnessmeals.com/wp-content/uploads/2018/03/fruit-and-oatmeal-breakfast-bowl-5-SQUARE.jpg" alt=" "></img>
                        </div>
                    </div>

                    <div className="">
                        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full`}>
                            <p><h1 className=" text-3xl">Good health starts with what you eat.</h1> <br></br>
                            Want to eat more mindfully? <br></br>
                            Track meals, learn about your habits, and reach your goals with Nutrimental. <br></br>
                            Sign up today!</p>
                        </div>
                    </div>
                </div>
                
                {/* <!-- Second row of text (left) and image (right) --> */}
                <div className="flex justify-center py-8 sm:px-6 lg:px-8 w-auto sm:mx-24 md:mx-44 lg:mx-44">
                <div className="">
                        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full`}>
                            <p><h1 className=" text-3xl">Search from over 14 million foods.</h1> <br></br>
                            See a breakdown of calories and nutrients, compare serving sizes, and discover how the food you eat supports your goals. <br></br>
                            </p>
                        </div>
                    </div>

                    <div className="">
                        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full`}>
                            <img src="https://www.verywellfit.com/thmb/dOIXrDmzf-MQ18pdebjLQstybts=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/raspberries-annotation-76bb24e2c56a40c5a9dd8b0c91a37ef5.jpg" alt=" "></img>
                        </div>
                    </div>
                </div>
            </div>
    )
}
