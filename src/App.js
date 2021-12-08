/* eslint no-eval: 0 */
import { useState } from "react";
import "./App.css";

function App() {
	const [expression, setExpression] = useState("");
	const keyData = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "00", "%"];

	const [result, setResult] = useState('00');

  // const handleShowResult = () => {
  //   setResult(String(eval(expression)));
  // }

	return (
		<div className="App">
			<div className="calculator">
				<div className="navbar">
					<h4>Calculator</h4>
				</div>
				<div className="display">
					<div className="expression">{expression}</div>
					<div className="result">{result}</div>
				</div>
				<div className="keypad">
					<div className="controllers">
            <button onClick={() => setExpression(expression.substr(0, expression.length-1))}>Clear</button>
            <button onClick={() => setExpression('')}>AC</button>
          </div>
					<div className="actions">
						<div className="operands">
							{keyData.map((item) => (
								<button
									key={item}
									value={item}
									onClick={(e) => setExpression(expression + e.target.value)}
								>
									{item}
								</button>
							))}
						</div>
						<div className="operator">
							<button
								value="+"
								onClick={(e) => setExpression(expression + e.target.value)}
							>
								+
							</button>
							<button
								value="-"
								onClick={(e) => setExpression(expression + e.target.value)}
							>
								-
							</button>
							<button
								value="*"
								onClick={(e) => setExpression(expression + e.target.value)}
							>
								*
							</button>
							<button
								value="/"
								onClick={(e) => setExpression(expression + e.target.value)}
							>
								/
							</button>
							<button
								value="="
								onClick={() => setResult(String(eval(expression)))}
							>
								=
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
