from crewai import Task

from agents import (
    reading_agent,
    writing_agent,
    vocabulary_agent,
    grammar_agent,
)


# =========================================================
# READING TASK
# =========================================================

reading_task = Task(
    description=(
        "Create a completely NEW English reading practice session.\n\n"

        "Learner level: {level}\n"
        "Unique quiz session: {session_id}\n\n"

        "IMPORTANT:\n"
        "Every time this task runs, create a NEW passage and NEW questions. "
        "Do not reuse a previous passage, story, character, or question set.\n\n"

        "Return ONLY the following plain-text format. "
        "Do not use Markdown. Do not use **, ###, ---, bullets, or extra text.\n\n"

        "TITLE: Short reading title\n"
        "PASSAGE: One reading passage suitable for the learner level.\n\n"

        "QUESTION 1: Question text\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: B\n"
        "EXPLANATION: Short explanation.\n\n"

        "QUESTION 2: Question text\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: C\n"
        "EXPLANATION: Short explanation.\n\n"

        "QUESTION 3: Question text\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: A\n"
        "EXPLANATION: Short explanation.\n\n"

        "QUESTION 4: Question text\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: D\n"
        "EXPLANATION: Short explanation.\n\n"

        "QUESTION 5: Question text\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: B\n"
        "EXPLANATION: Short explanation.\n\n"

        "RULES:\n"
        "1. Create exactly one passage.\n"
        "2. Create exactly 5 questions.\n"
        "3. Every question must have exactly four options: A, B, C, D.\n"
        "4. Only one option must be correct for each question.\n"
        "5. ANSWER must contain only A, B, C, or D.\n"
        "6. Every answer must be supported by the passage.\n"
        "7. Explanations must be short and clear.\n"
        "8. Match the vocabulary and difficulty to {level}.\n"
        "9. Use different content every time this task runs.\n"
        "10. Do not reveal answers inside the passage.\n"
        "11. Do not add anything before TITLE or after the final EXPLANATION."
    ),
    expected_output=(
        "Plain text containing TITLE, PASSAGE, exactly 5 QUESTION sections, "
        "A-D options, ANSWER, and EXPLANATION for every question."
    ),
    agent=reading_agent,
)


# =========================================================
# WRITING TASK
# =========================================================

writing_task = Task(
    description=(
        "Create a completely NEW English writing practice task.\n\n"

        "Learner level: {level}\n"
        "Unique practice session: {session_id}\n\n"

        "IMPORTANT:\n"
        "Every time this task runs, create a NEW writing topic. "
        "Do not reuse the previous topic or instructions.\n\n"

        "Return ONLY the following plain-text format.\n"
        "Do not use Markdown, bullets, ###, **, or extra text.\n\n"

        "TITLE: Short writing task title\n"
        "TOPIC: Clear writing topic for the learner.\n"
        "INSTRUCTIONS: Clear instructions explaining what the learner should write.\n"
        "RECOMMENDED LENGTH: Recommended number of words.\n"
        "FOCUS: Important grammar, vocabulary, organization, or sentence skills to practice.\n\n"

        "RULES:\n"
        "1. Create exactly one writing task.\n"
        "2. Make the topic suitable for {level}.\n"
        "3. Beginner topics should use simple everyday situations.\n"
        "4. Intermediate topics should require more detailed ideas and opinions.\n"
        "5. Advanced topics should require deeper ideas, arguments, or analysis.\n"
        "6. Give clear instructions.\n"
        "7. Give a realistic recommended word length.\n"
        "8. Give useful writing skills to focus on.\n"
        "9. Create different content every time this task runs.\n"
        "10. Do not add anything before TITLE or after FOCUS."
    ),
    expected_output=(
        "Plain text containing TITLE, TOPIC, INSTRUCTIONS, "
        "RECOMMENDED LENGTH, and FOCUS."
    ),
    agent=writing_agent,
)


# =========================================================
# VOCABULARY TASK
# =========================================================

vocabulary_task = Task(
    description=(
        "Create a completely NEW English vocabulary practice session.\n\n"

        "Learner level: {level}\n"
        "Unique practice session: {session_id}\n\n"

        "IMPORTANT:\n"
        "Every time this task runs, choose a NEW vocabulary word. "
        "Do not reuse the previous word or question.\n\n"

        "Return ONLY the following plain-text format.\n"
        "Do not use Markdown, bullets, ###, **, or extra text.\n\n"

        "WORD: One useful English word.\n"
        "MEANING: Simple and accurate meaning.\n"
        "PART OF SPEECH: Noun, verb, adjective, adverb, etc.\n"
        "EXAMPLE: One natural example sentence.\n"
        "SYNONYMS: Two or three useful synonyms.\n\n"

        "QUESTION: Multiple-choice question testing the meaning or usage of the word.\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: B\n"
        "EXPLANATION: Short explanation of why the answer is correct.\n\n"

        "RULES:\n"
        "1. Choose exactly one vocabulary word.\n"
        "2. Match the word difficulty to {level}.\n"
        "3. Beginner words should be common and practical.\n"
        "4. Intermediate words should be useful for communication and study.\n"
        "5. Advanced words should be more sophisticated and academic or professional.\n"
        "6. Give exactly four options: A, B, C, D.\n"
        "7. Only one option can be correct.\n"
        "8. ANSWER must contain only A, B, C, or D.\n"
        "9. Create different content every time this task runs.\n"
        "10. Do not add anything before WORD or after EXPLANATION."
    ),
    expected_output=(
        "Plain text containing WORD, MEANING, PART OF SPEECH, EXAMPLE, "
        "SYNONYMS, QUESTION, A-D options, ANSWER, and EXPLANATION."
    ),
    agent=vocabulary_agent,
)


# =========================================================
# GRAMMAR TASK
# =========================================================

grammar_task = Task(
    description=(
        "Create a completely NEW English grammar practice session.\n\n"

        "Learner level: {level}\n"
        "Unique practice session: {session_id}\n\n"

        "IMPORTANT:\n"
        "Every time this task runs, choose a NEW grammar concept or exercise. "
        "Do not reuse the previous concept or question.\n\n"

        "Return ONLY the following plain-text format.\n"
        "Do not use Markdown, bullets, ###, **, or extra text.\n\n"

        "TOPIC: Name of the grammar concept.\n"
        "RULE: Simple explanation of the grammar rule.\n\n"

        "QUESTION: One multiple-choice grammar question.\n"
        "A: Option A\n"
        "B: Option B\n"
        "C: Option C\n"
        "D: Option D\n"
        "ANSWER: B\n"
        "EXPLANATION: Short explanation of why the answer is correct.\n\n"

        "RULES:\n"
        "1. Choose exactly one grammar concept.\n"
        "2. Match the grammar difficulty to {level}.\n"
        "3. Beginner should focus on basic grammar such as simple tenses, "
        "articles, pronouns, prepositions, and subject-verb agreement.\n"
        "4. Intermediate should use concepts such as present perfect, "
        "conditionals, reported speech, modals, and more complex sentence structures.\n"
        "5. Advanced should use advanced tenses, mixed conditionals, "
        "inversion, advanced clauses, and sophisticated sentence structures.\n"
        "6. Create exactly four options: A, B, C, D.\n"
        "7. Only one option can be correct.\n"
        "8. ANSWER must contain only A, B, C, or D.\n"
        "9. Create different content every time this task runs.\n"
        "10. Do not add anything before TOPIC or after EXPLANATION."
    ),
    expected_output=(
        "Plain text containing TOPIC, RULE, QUESTION, A-D options, "
        "ANSWER, and EXPLANATION."
    ),
    agent=grammar_agent,
)


print("4 AI English Coach tasks loaded successfully")