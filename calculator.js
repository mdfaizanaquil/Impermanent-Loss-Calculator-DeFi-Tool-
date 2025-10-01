document.getElementById('calculateBtn').addEventListener('click', () => {
    // Get initial values
    const initialAmountA = parseFloat(document.getElementById('initialAmountA').value);
    const initialPriceA = parseFloat(document.getElementById('initialPriceA').value);
    const initialAmountB = parseFloat(document.getElementById('initialAmountB').value);
    const initialPriceB = parseFloat(document.getElementById('initialPriceB').value);

    // Get current prices
    const currentPriceA = parseFloat(document.getElementById('currentPriceA').value);
    const currentPriceB = parseFloat(document.getElementById('currentPriceB').value);

    const resultsDiv = document.getElementById('results');

    if (isNaN(initialAmountA) || isNaN(initialPriceA) || isNaN(initialAmountB) || isNaN(initialPriceB) || isNaN(currentPriceA) || isNaN(currentPriceB)) {
        resultsDiv.innerHTML = "<p>Please fill in all fields.</p>";
        return;
    }

    // --- Calculations ---

    // 1. Value if you just held the tokens
    const valueIfHeld = (initialAmountA * currentPriceA) + (initialAmountB * currentPriceB);

    // 2. Value of assets in the liquidity pool
    const k = initialAmountA * initialAmountB; // Constant product
    const currentPriceRatio = currentPriceA / currentPriceB;
    
    const currentAmountA = Math.sqrt(k / currentPriceRatio);
    const currentAmountB = Math.sqrt(k * currentPriceRatio);
    
    const valueInPool = (currentAmountA * currentPriceA) + (currentAmountB * currentPriceB);
    
    // 3. Impermanent Loss
    const impermanentLoss = valueIfHeld - valueInPool;
    const ilPercentage = (impermanentLoss / valueIfHeld) * 100;

    // --- Display Results ---
    resultsDiv.innerHTML = `
        <p><strong>Value if Held:</strong> $${valueIfHeld.toFixed(2)}</p>
        <p><strong>Value in Liquidity Pool:</strong> $${valueInPool.toFixed(2)}</p>
        <hr>
        <p><strong>Impermanent Loss:</strong> $${impermanentLoss.toFixed(2)}</p>
        <p><strong>IL Percentage:</strong> ${ilPercentage.toFixed(2)}%</p>
    `;
});
