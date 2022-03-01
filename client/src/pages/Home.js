import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {" "}
      {/* <!-- encapsulates the entire block --> */}
      <div className="p-4 flex justify-center">
        <h1 className="flex flex-col text-center w-auto">
          <p className="text-5xl pb-2">Welcome to Nutrimental!</p>
          <p className="text-5xl">We're here to help.</p>
        </h1>
      </div>
      {/* <!-- Top row of image (left) and text (right) --> */}
      <div className="flex flex-col w-full justify-center">
        <div className="flex flex-row justify-center">
          <div className="py-8 px-4">
            <img
              src="https://healthyfitnessmeals.com/wp-content/uploads/2018/03/fruit-and-oatmeal-breakfast-bowl-5-SQUARE.jpg"
              alt=" "
            ></img>
          </div>

          <div className="py-8 px-4">
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
        {/* <!-- Second row of text (left) and image (right) --> */}
        <div className="flex justify-center">
          <div className="py-8 px-4">
            <span>
              <h1 className="text-3xl mb-4">
                Log food items into our tracker.
              </h1>{" "}
              <br></br>
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
  );
}
