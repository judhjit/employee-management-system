import React from "react";
import Navbar from "../../../Navbar";
import classes from "./Meal.module.css";
import logo from "../../../assets/Mealbg.jpg";
import CurrentBookings from "../../../Bookings/CurrentBookings";

function Meal() {
  return (
    <>
      <section className={classes.mealpage}>
        <Navbar />
        <h2 className={classes.text}>
          <span className={classes.blackText}>Book</span>{" "}
          <span className={classes.blueText}>Your Lunch</span>
        </h2>
        <img className={classes.burger} src={logo} alt="not found"></img>
        <form className={classes.preferencelist}>
          <h3>Preferences:</h3>
          <div>
            <input
              type="radio"
              id="veg"
              name="fav_food"
              className={classes.radiogrp}
            />
            <label for="html">Vegetarian</label>
            <br />
          </div>
          <div>
            <input
              type="radio"
              id="non-veg"
              name="fav_food"
              className={classes.radiogrp}
            />
            <label for="css">Non-vegetarian</label>
            <br />
          </div>
          <div className={classes.btngrp}>
            <div className={classes.buttonContainer}>
              <button type="submit" className={classes.btnskip}>
                Skip
              </button>
            </div>
            <div className={classes.buttonContainer}>
              <button type="submit" className={classes.btnnext}>
                Next
              </button>
            </div>
          </div>
        </form>
      </section>
      <section className={classes.mealfooter}>
        <CurrentBookings />
      </section>
    </>
  );
}

export default Meal;
