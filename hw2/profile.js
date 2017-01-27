window.onload = function() {
    document.getElementById("my_button").addEventListener("click", clicked);

    // so we can show appropriate help text at the beginning of the form
    const help_text = {"name":"Your full name", "email":"Your email address",
        "phone": "Your phone number. Digits only", 
        "birthday":"Your date of birth, must be over 16",
        "zipcode":"Zipcode, digits only", 
        "password":"Your password, more than 6 digits",
        "passconfirm":"Confirm your password, must be the same"}

    function clicked() {
        document.getElementsByTagName("div")

        const fields = document.getElementsByClassName("field");
        // fields is not an array, bind forEach function to it.
        [].forEach.call(fields,function (item) {
            const input =item.getElementsByTagName("input")[0];
            const entered = input.value;
            let display = item.getElementsByTagName("span")[0].innerHTML;
            if (entered !== "" && !entered.match(input.pattern)) {
                document.getElementById("help").innerHTML = help_text[input.id];
            }
            else if (entered !== "" && entered !== display){
                display = entered;
                item.getElementsByTagName("span")[0].innerHTML=entered;
            }

        });
    };
};
