import React from "react";

const QuestionTracker = props => (
    <div className="row tracker">
        <div className="col-4">
        <div className="align-left">
            <span className="question-tracker">{props.category}</span>
        </div>
        </div>
        <div className="col-6">
        </div>
        <div className="col-2 pull-right">
            <div className="align-right">
                <span className="question-tracker">Difficulty: {props.difficulty}</span>
            </div>
        </div>
    </div>
)

export default QuestionTracker;