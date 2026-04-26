const poll = new Map();
let voterNumber = 1;

function addOption(option) {
    if (!option) {
        return "Option cannot be empty.";
    }

    if (poll.has(option)) {
        return `Option "${option}" already exists.`;
    }

    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
    }

    const voters = poll.get(option);

    if (voters.has(voterId)) {
        return `Voter ${voterId} has already voted for "${option}".`;
    }

    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
    let results = "Poll Results:";

    for (const [option, voters] of poll) {
        results += `\n${option}: ${voters.size} vote(s)`;
    }

    return results;
}

function updateResults() {
    document.getElementById("results").textContent = displayResults();
}

function voteFlower(option) {
    const voterId = `visitor${voterNumber}`;
    const message = vote(option, voterId);

    document.getElementById("vote-message").textContent = message;

    voterNumber += 1;
    updateResults();
}

addOption("Rose");
addOption("Tulip");
addOption("Sunflower");
addOption("Daisy");
addOption("Orchid");

vote("Rose", "visitor-a");
vote("Tulip", "visitor-b");
vote("Sunflower", "visitor-c");

updateResults();