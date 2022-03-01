import React from "react";

export default function Home() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col mx-8 w-2/3 h-auto">
        <div className="p-4 flex justify-center m-auto">
          <h1 className="flex flex-col text-center w-auto mt-2 p-4">
            <p className="text-5xl pb-2 font-bold">Welcome to Nutrimental</p>
            <p className="text-5xl">We're here to help</p>
          </h1>
        </div>
        <div className="flex flex-col w-full justify-center mt-4">
          <div className="flex flex-row justify-center px-8">
            <div>
              <img
                className="w-4/5"
                src="https://healthyfitnessmeals.com/wp-content/uploads/2018/03/fruit-and-oatmeal-breakfast-bowl-5-SQUARE.jpg"
                alt=" "
              ></img>
            </div>
            <div className="-ml-4">
              <span>
                <h1 className="text-3xl mb-4">
                  We can help you in achieving your goals.
                </h1>
                <p>
                  Nutrimental is here to guide every step. Track meals, observe
                  your habits, and achieve your goals!
                </p>
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center px-8">
            <div className="py-8 px-4 -mr-4">
              <span>
                <h1 className="text-3xl mb-4">
                  Log food items into our tracker.
                </h1>
                <p>
                  Search food items, see a breakdown of calories and nutrients,
                  and compare portion sizes Then taylor dietary habits according
                  to our feedback.
                </p>
              </span>
            </div>
            <div className="py-8 px-4">
              <img
                src="https://www.verywellfit.com/thmb/dOIXrDmzf-MQ18pdebjLQstybts=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/raspberries-annotation-76bb24e2c56a40c5a9dd8b0c91a37ef5.jpg"
                alt=" "
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
