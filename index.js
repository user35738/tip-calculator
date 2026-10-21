
const btnEl = document.getElementById("calculate");
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const totalSpan = document.getElementById("total");
const tipAmountSpan = document.getElementById("tipAmount");
const errorEl = document.getElementById("error");
const resultCard = document.querySelector(".result-card");
const tipButtons = document.querySelectorAll(".tip-option");

// Հաշվարկի ֆունկցիա
function calculateTotal() {
    const billValue = billInput.value.trim();
    const tipValue = tipInput.value.trim();

    // Ստուգում ենք՝ դաշտերը լրացվա՞ծ են
    if (billValue === "" || tipValue === "") {
        errorEl.innerText = "Խնդրում ենք լրացնել երկու դաշտերը։";
        return;
    }

    const bill = Number(billValue);
    const tip = Number(tipValue);

    // Ստուգում ենք մուտքագրված թվերը
    if (
        !Number.isFinite(bill) ||
        !Number.isFinite(tip) ||
        bill < 0 ||
        tip < 0 ||
        tip > 1000
    ) {
        errorEl.innerText =
            "Մուտքագրեք վավեր գումար և թեյավճար՝ 0-ից 1000%-ի սահմաններում։";
        return;
    }

    // Հաշվում ենք թեյավճարն ու ընդհանուր գումարը
    const tipAmount = bill * tip / 100;
    const totalValue = bill + tipAmount;

    // Ցուցադրում ենք արդյունքները
    totalSpan.innerText = totalValue.toFixed(2);
    tipAmountSpan.innerText = tipAmount.toFixed(2);

    // Մաքրում ենք սխալը
    errorEl.innerText = "";

    // Ավելացնում ենք արդյունքի փայլող էֆեկտը
    resultCard.classList.remove("updated");

    // Վերագործարկում ենք CSS անիմացիոն անցումը
    void resultCard.offsetWidth;

    resultCard.classList.add("updated");
}

// Հաշվարկում ենք կոճակը սեղմելիս
btnEl.addEventListener("click", calculateTotal);

// Արագ ընտրում ենք թեյավճարի տոկոսը
tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        tipInput.value = button.dataset.tip;

        // Ցույց ենք տալիս ընտրված կոճակը
        tipButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        // Եթե հաշվի գումարն արդեն լրացված է, վերահաշվում ենք
        if (billInput.value.trim() !== "") {
            calculateTotal();
        } else {
            errorEl.innerText = "";
        }
    });
});

// Ձեռքով փոխելիս հեռացնում ենք արագ ընտրության նշումը
tipInput.addEventListener("input", () => {
    tipButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.tip === tipInput.value
        );
    });
});

// Enter ստեղնով նույնպես կարող ենք հաշվարկել
[billInput, tipInput].forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            calculateTotal();
        }
    });
});
