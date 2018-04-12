import React from "react";

const QuestionTracker = props => (
    <div className="row">
        <div className="col-3">
        <div className="align-left">
            <span className="question-tracker">Category: {props.category}</span>
        </div>
        </div>
        <div className="col-6">
        </div>
        <div className="col-3">
            <div className="align-right">
                <span className="question-tracker">Question: {props.questionNum} / {props.totalQuestions}</span>
            </div>
        </div>
    </div>
)

export default QuestionTracker;