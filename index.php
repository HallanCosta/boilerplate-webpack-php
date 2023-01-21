<?php

define('CAN_IMPORT', 'yes');

require_once('header.php');
?>

    <section class="home">
        <h1 style="font-size: 50px; text-align: center;">Boilerplate PHP sem framework</h1>
        <p id="test" style="font-size: 24px; text-align: center; border: 1px solid black; padding: 10px; cursor: pointer;">clique aqui para testar o JS e o path alias</p>
    </section>

    <script type="text/javascript">
        $$page = 'home';
    </script>

<?php

require_once('footer.php');
