import React from "react";
import withRouter from "./withRouter.js";
import * as Quest from "survey-react";
import "survey-react/survey.css";
import style from "./style/memTaskStyle.module.css";
import "./style/surveyStyle.css";
import * as utils from "./utils.js";

// quests
import { aes } from "./quest/aes.js";
import { audit } from "./quest/audit.js";
import { bis11 } from "./quest/bis.js";
import { eat26 } from "./quest/eat.js";
import { gse } from "./quest/gse.js";
import { lsas } from "./quest/lsas.js";
import { ocir } from "./quest/ocir.js";
import { rse } from "./quest/rse.js";
import { sds } from "./quest/sds.js";
import { ssms } from "./quest/ssms.js";
import { staiy2 } from "./quest/staiy2.js";

import { demo } from "./quest/demo.js";
import { icar1 } from "./quest/icar1.js";
import { icar2 } from "./quest/icar2.js";

import { DATABASE_URL } from "./config";

class Questionnaires extends React.Component {
  constructor(props) {
    super(props);

    const userID = this.props.state.userID;
    const prolificID = this.props.state.prolificID;
    const condition = this.props.state.condition;
    const date = this.props.state.date;
    const startTime = this.props.state.startTime;

    //when deug
    //  const userID = 100;
    //  const date = 100;
    //  const startTime = 100;

    var sectionTime = Math.round(performance.now());

    var quizLabel = [
      "AES",
      "AUDIT",
      "BIS11",
      "EAT26",
      "LSAS",
      "OCIR",
      "SDS",
      "SSMS",
      "STAIY2",
      "RSE",
      "GSE",
    ];
    var allQuizText = [
      aes,
      audit,
      bis11,
      eat26,
      lsas,
      ocir,
      sds,
      ssms,
      staiy2,
      rse,
      gse,
    ];

    //var allIQText = [icar1, icar2];

    //  console.log(allIQText);

    this.state = {
      prolificID: prolificID,
      condition: condition,
      userID: userID,
      date: date,
      startTime: startTime,
      section: "psych",
      sectionTime: sectionTime,
      resultAsString: {},

      qnStart: sectionTime,
      qnTime: sectionTime,
      qnTotal: 11,
      quizLabel: quizLabel,
      allQuizText: allQuizText,
      demo: demo,
      icar1: icar1,
      icar2: icar2,

      qnText1: [],
      qnText2: [],
      qnText3: [],
      qnText4: [],
      qnText5: [],
      qnText6: [],
      qnText7: [],
      qnText8: [],
      qnText9: [],
      qnText10: [],
      qnText11: [],

      instructScreen: true,
      questScreen: false,
      debug: false,
    };
  }

  //Define a callback methods on survey complete
  onComplete(survey, options) {
    // //Write survey results into database

    var quizText = "IQ_image";
    var quizPgFinish = "PgFinish_" + quizText;
    var quizRT = "PgRT_" + quizText;

    var qnTime = Math.round(performance.now());
    var qnRT = qnTime - this.state.qnTime;
    survey.setValue(quizPgFinish, qnTime);
    survey.setValue(quizRT, qnRT);

    var qnEnd = Math.round(performance.now());
    var prolificID = this.state.prolificID;
    survey.setValue("prolificID", prolificID);
    survey.setValue("condition", this.state.condition);
    survey.setValue("userID", this.state.userID);
    survey.setValue("date", this.state.date);
    survey.setValue("startTime", this.state.startTime);
    survey.setValue("section", this.state.section);
    survey.setValue("sectionTime", this.state.sectionTime);
    survey.setValue("qnTimeStart", this.state.qnStart);
    survey.setValue("qnTimeEnd", qnEnd);

    var resultAsString = JSON.stringify(survey.data);

    //  console.log("resultAsString", resultAsString);

    fetch(`${DATABASE_URL}/psych_quiz/` + prolificID, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: resultAsString,
    });

    this.setState({
      resultAsString: resultAsString,
    });

    setTimeout(
      function () {
        this.redirectToNextTask();
      }.bind(this),
      10
    );
  }

  startQuest() {
    this.setState({ questScreen: true, instructScreen: false });

    setTimeout(
      function () {
        this.shuffleQuest();
      }.bind(this),
      10
    );
  }

  timerCallback(survey) {
    var page = survey.pages.indexOf(survey.currentPage);
    let quizText;
    //CHECK THIS!!!
    if (page === 0) {
      quizText = "intro";
    } else if (page === 1) {
      quizText = "demo";
    } else if (page === 13) {
      quizText = "IQ_text";
    } else if (page === 14) {
      quizText = "IQ_image";
    } else {
      quizText = this.state.quizLabel[page - 2];
    }

    var questPgFinish = "PgFinish_" + quizText;
    var questRT = "PgRT_" + quizText;
    var qnTime = Math.round(performance.now());
    var qnRT = qnTime - this.state.qnTime;
    survey.setValue(questPgFinish, qnTime);
    survey.setValue(questRT, qnRT);

    this.setState({ qnTime: qnTime });
  }

  redirectToNextTask() {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.navigate("/End?PROLIFIC_PID=" + this.state.prolificID, {
      state: {
        prolificID: this.state.prolificID,
        condition: this.state.condition,
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }

  shuffleQuest() {
    var allQuizText = this.state.allQuizText;
    var quizLabel = this.state.quizLabel;

    utils.shuffleSame(allQuizText, quizLabel);

    allQuizText = allQuizText.filter(function (val) {
      return val !== undefined;
    });
    quizLabel = quizLabel.filter(function (val) {
      return val !== undefined;
    });

    this.setState({
      qnText1: allQuizText[0],
      qnText2: allQuizText[1],
      qnText3: allQuizText[2],
      qnText4: allQuizText[3],
      qnText5: allQuizText[4],
      qnText6: allQuizText[5],
      qnText7: allQuizText[6],
      qnText8: allQuizText[7],
      qnText9: allQuizText[8],
      qnText10: allQuizText[9],
      qnText11: allQuizText[10],
      quizLabel: quizLabel,
    });
  }

  handleBegin(key_pressed) {
    var whichButton = key_pressed;
    if (whichButton === 3) {
      setTimeout(
        function () {
          this.startQuest();
        }.bind(this),
        0
      );
    }
  }

  // handle key key_pressed
  _handleBeginKey = (event) => {
    var key_pressed;

    switch (event.keyCode) {
      case 32:
        //    this is sapcebar
        key_pressed = 3;
        this.handleBegin(key_pressed);
        break;
      default:
    }
  };

  //  useEffect() {
  //    window.scrollTo(0, 0);
  //  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }

  render() {
    let text;
    if (this.state.debug === false) {
      if (
        this.state.instructScreen === true &&
        this.state.questScreen === false
      ) {
        //      this.useEffect();
        document.addEventListener("keyup", this._handleBeginKey);
        //intructions
        text = (
          <div className={style.bg}>
            <div className={style.textFrame}>
              <div className={style.fontStyle}>
                <div>
                  For the last section, we would like you to:
                  <br />
                  <br />
                  <li>Provide some demographic information (age and gender)</li>
                  <li>Complete {this.state.qnTotal} questionnaires</li>
                  <li>Complete a short IQ quiz</li>
                  <br />
                  Do read the instructions for each quiz, which will be
                  positioned at the top of each page, carefully.
                  <br />
                  <br />
                  <center>
                    Please press [<strong>SPACEBAR</strong>] to begin.
                  </center>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (
        this.state.instructScreen === false &&
        this.state.questScreen === true
      ) {
        //the quiz
        document.removeEventListener("keyup", this._handleBeginKey);
        Quest.StylesManager.applyTheme("default");

        var myCss = {
          matrix: {
            // root: "table table-striped",
            root: "table sv_q_matrix",
          },
        };

        var json = {
          title: null,
          showProgressBar: "top",
          pages: [
            {
              questions: this.state.demo,
            },
            {
              questions: this.state.qnText1,
            },
            {
              questions: this.state.qnText2,
            },
            {
              questions: this.state.qnText3,
            },
            {
              questions: this.state.qnText4,
            },
            {
              questions: this.state.qnText5,
            },
            {
              questions: this.state.qnText6,
            },
            {
              questions: this.state.qnText7,
            },
            {
              questions: this.state.qnText8,
            },
            {
              questions: this.state.qnText9,
            },
            {
              questions: this.state.qnText10,
            },
            {
              questions: this.state.qnText11,
            },
            {
              questions: this.state.icar1,
            },
            {
              questions: this.state.icar2,
            },
          ],
        };

        text = (
          <div className="textBox2">
            <Quest.Survey
              json={json}
              css={myCss}
              onComplete={this.onComplete.bind(this)}
              onCurrentPageChanged={this.timerCallback.bind(this)}
            />
          </div>
        );
      }
    } else if (this.state.debug === true) {
      text = (
        <div className={style.bg}>
          <div className={style.textFrame}>
            <div className={style.fontStyle}>
              Press the [<strong>SPACEBAR</strong>] to skip to next section.
            </div>
          </div>
        </div>
      );
    }
    return <div>{text}</div>;
  }
}
export default withRouter(Questionnaires);
