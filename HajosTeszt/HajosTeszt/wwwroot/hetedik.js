<!DOCTYPE HTML>
<HTML lang="hu">
<head>
    <meta charset="utf-8">
    <title>Hajós teszt</title>
</head>
<body>
     //<script>
                var kérdések;

                function letöltésBefejeződött(d) {
                    console.log("Sikeres letöltés")
                    console.log(d)
                    kérdések=d;
                }

                fetch(`/questions.json`)
                    .then(response => response.json())
                    .then(data => letöltésBefejeződött(data)
                );

                window.onload(letöltésBefejeződött());
     </script>
</body> 
</HTML> 