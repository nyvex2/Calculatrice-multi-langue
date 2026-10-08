import { useEffect, useMemo, useState } from 'react';
import {
  AlignLeft, ArrowLeftRight, BookOpen, Calculator, Check, ChevronDown, Copy,
  FlaskConical, Globe2, History, Info, Languages, Menu, Moon, Settings2,
  Shield, Sun, X,
} from 'lucide-react';

type Language = 'fr' | 'en' | 'es' | 'ar';
type Mode = 'basic' | 'scientific' | 'advanced';
type Screen = 'calculator' | 'history' | 'converter' | 'constants' | 'references' | 'about' | 'rules' | 'terms' | 'credits' | 'settings';
type HistoryEntry = { expression: string; result: string; id: string };

const words: Record<Language, Record<string, string>> = {
  fr: {
    calculator:'Calculatrice', subtitle:'Un instrument de calcul, tout simplement.', basic:'Mode basique', scientific:'Scientifique', advanced:'Avancé',
    tools:'Outils', information:'Informations',
    ready:'PRÊTE À CALCULER', angle:'ANGLE', degrees:'DEG', radians:'RAD', memory:'Calcul instantané', expression:'Expression',
    history:'Historique', clear:'Effacer', noHistory:'Votre historique est vide', historyHint:'Vos prochains calculs apparaîtront ici.',
    converter:'Conversions', convertHint:'Convertissez les unités courantes.', quantity:'Grandeur', from:'De', to:'Vers', value:'Valeur', result:'Résultat',
    length:'Longueur', mass:'Masse', temperature:'Température', volume:'Volume', time:'Temps',
    constants:'Constantes', constantsHint:'Touchez une constante pour l’insérer dans le calcul.',
    references:'Références', referencesText:'Quelques repères utiles pour vos calculs.',
    about:'À propos', rules:'Règles de calcul', terms:'Conditions d’utilisation', credits:'Crédits', settings:'Réglages',
    aboutText:'Adam Calculator est une calculatrice web personnelle pensée et créée par Adam Eddahbi. Un outil discret, rapide et fiable pour les calculs du quotidien, avec des fonctions scientifiques à portée de main. Tous les calculs et réglages restent dans votre navigateur.',
    rulesIntro:'La calculatrice suit les règles mathématiques usuelles, sans approximation cachée.',
    ruleOrder:'Ordre des opérations', ruleOrderText:'Les parenthèses sont évaluées en premier, puis les fonctions, les puissances, les multiplications et divisions, puis les additions et soustractions. Les puissances s’associent de droite à gauche.',
    rulePercent:'Pourcentages', rulePercentText:'Le symbole % transforme la valeur qui le précède en fraction sur 100. Par exemple, 25% vaut 0,25.',
    ruleAngles:'Angles', ruleAnglesText:'Les fonctions trigonométriques utilisent le mode DEG (degrés) par défaut. Basculez en RAD pour les radians.',
    ruleVerify:'Vérifiez les résultats', ruleVerifyText:'Vérifiez indépendamment tout résultat important avant de l’utiliser.',
    ruleResponsible:'Usage responsable', ruleResponsibleText:'Utilisez l’outil avec discernement et sous votre propre responsabilité.',
    ruleSecurity:'Utilisation du site', ruleSecurityText:'Toute tentative de perturber, d’endommager ou de contourner le fonctionnement du site est interdite.',
    termsText:'Adam Calculator est un outil personnel gratuit, et non un service fourni par une société. En utilisant le site, vous acceptez ces conditions. Vous pouvez utiliser la calculatrice pour des calculs personnels courants. Les résultats sont calculés localement et peuvent être inexacts ; vérifiez-les avant de vous y fier, en particulier dans un contexte professionnel, financier ou de sécurité. Le service est fourni sans garantie et son auteur décline toute responsabilité pour les conséquences de son utilisation, dans la mesure permise par la loi. Le nom, le contenu et le code du site restent soumis aux droits de leurs titulaires respectifs. Le service ou ces conditions peuvent évoluer sans préavis. Une disponibilité continue n’est pas garantie. Pour toute question, adressez-vous au créateur, Adam Eddahbi.',
    termsAcceptance:'Acceptation des conditions', termsAcceptanceText:'En utilisant le site, vous acceptez les présentes conditions.',
    termsUse:'Utilisation du service', termsUseText:'Vous pouvez utiliser la calculatrice pour des calculs personnels courants. Toute tentative de perturbation ou de contournement du site est interdite.',
    termsAccuracy:'Exactitude des résultats', termsAccuracyText:'Les résultats sont fournis à titre indicatif et peuvent comporter des erreurs ou des arrondis.',
    termsResponsibility:'Responsabilité', termsResponsibilityText:'Vérifiez les résultats importants. Dans la mesure permise par la loi, le créateur décline toute responsabilité liée à l’utilisation de l’outil.',
    termsIntellectual:'Propriété intellectuelle', termsIntellectualText:'Le nom, le contenu et le code sont protégés par les droits de leurs titulaires respectifs. Adam Calculator ne prétend pas être une société enregistrée.',
    termsChanges:'Modifications du service', termsChangesText:'Le service et ses conditions peuvent être modifiés afin de corriger ou d’améliorer l’application.',
    termsAvailability:'Disponibilité', termsAvailabilityText:'Le service est fourni gratuitement, sans garantie de fonctionnement continu ni de disponibilité.',
    termsContact:'Contact', termsContactText:'Pour toute question, contactez le créateur par le canal de projet Replit utilisé pour vous partager la calculatrice.',
    creditsText:'Adam Calculator — Créé par Adam Eddahbi. Réalisée avec soin pour le web, avec des outils open source. Merci de l’utiliser.',
    language:'Langue', appearance:'Apparence', darkMode:'Thème sombre', darkHint:'Une palette douce pour les environnements peu éclairés.',
    angleSetting:'Unité d’angle', clearHistory:'Effacer l’historique',
    animations:'Animations', animationsHint:'Transitions discrètes entre les interactions.', close:'Fermer', chooseLanguage:'Choisir une langue', light:'Clair', dark:'Sombre',
    errorSyntax:'Expression invalide', errorDivide:'Division par zéro impossible', errorDomain:'Valeur hors du domaine de définition', errorNumber:'Résultat non fini',
    copy:'Copier le résultat', copied:'Copié', clearEntry:'Effacer', delete:'Retour arrière', allClear:'Tout effacer', decimal:'Virgule',
    menu:'Ouvrir le menu', languageMenu:'Changer de langue', author:'Créé par Adam Eddahbi', copyright:'© 2026 Adam Calculator',
    sin:'sin', cos:'cos', tan:'tan', asin:'sin⁻¹', acos:'cos⁻¹', atan:'tan⁻¹', log:'log', ln:'ln', exp:'exp', sqrt:'√', square:'x²', power:'xʸ', inverse:'1/x', factorial:'n!', abs:'|x|', modulo:'mod', floor:'⌊x⌋', ceil:'⌈x⌉', round:'arrondi',
    pi:'Pi', euler:'Euler', sqrt2:'Racine de 2', phi:'Nombre d’or',
    lengthM:'Mètre', lengthKm:'Kilomètre', lengthCm:'Centimètre', lengthMi:'Mile', lengthFt:'Pied', lengthIn:'Pouce',
    massKg:'Kilogramme', massG:'Gramme', massLb:'Livre', massOz:'Once',
    tempC:'Celsius', tempF:'Fahrenheit', tempK:'Kelvin',
    volL:'Litre', volMl:'Millilitre', volM3:'Mètre cube', volGal:'Gallon US',
    timeS:'Seconde', timeMin:'Minute', timeH:'Heure', timeDay:'Jour',
    referencePi:'π ≈ 3,141592653589793 — rapport du périmètre d’un cercle à son diamètre.',
    referenceE:'e ≈ 2,718281828459045 — base des logarithmes naturels.',
    referenceGolden:'φ ≈ 1,618033988749895 — nombre d’or, solution positive de x² − x − 1 = 0.',
    referenceConversions:'1 pouce = 2,54 cm · 1 mile = 1,609344 km · 1 livre = 0,45359237 kg.',
    referenceSin:'sin(x) — sinus de l’angle x.',
    referenceCos:'cos(x) — cosinus de l’angle x.',
    referenceTan:'tan(x) — tangente de l’angle x.',
    referenceLog:'log(x) — logarithme décimal (base 10).',
    referenceLn:'ln(x) — logarithme naturel (base e).',
    referenceSquare:'x² — carré de x, soit x multiplié par lui-même.',
    referenceSqrt:'√x — racine carrée principale de x.',
    referencePower:'xʸ — x élevé à la puissance y.',
    referenceAngles:'Les angles sont en degrés (DEG) ou radians (RAD), selon le réglage.',
  },
  en: {
    calculator:'Calculator', subtitle:'A considered instrument for everyday math.', basic:'Basic mode', scientific:'Scientific', advanced:'Advanced',
    tools:'Tools', information:'Information',
    ready:'READY WHEN YOU ARE', angle:'ANGLE', degrees:'DEG', radians:'RAD', memory:'Instant calculation', expression:'Expression',
    history:'History', clear:'Clear', noHistory:'Your history is clear', historyHint:'Your next calculations will appear here.',
    converter:'Conversions', convertHint:'Convert everyday units with ease.', quantity:'Quantity', from:'From', to:'To', value:'Value', result:'Result',
    length:'Length', mass:'Mass', temperature:'Temperature', volume:'Volume', time:'Time',
    constants:'Constants', constantsHint:'Select a constant to insert it into your calculation.',
    references:'References', referencesText:'A few useful points of reference.',
    about:'About', rules:'Calculation rules', terms:'Terms of service', credits:'Credits', settings:'Settings',
    aboutText:'Adam Calculator is a personal web calculator designed and built by Adam Eddahbi. A quiet, quick, dependable tool for everyday arithmetic, with scientific functions close at hand. Your calculations and settings stay in your browser.',
    rulesIntro:'The calculator follows familiar mathematical conventions, with no hidden approximation.',
    ruleOrder:'Order of operations', ruleOrderText:'Parentheses are evaluated first, followed by functions, powers, multiplication and division, then addition and subtraction. Powers associate from right to left.',
    rulePercent:'Percentages', rulePercentText:'The % symbol converts the preceding value to a fraction out of 100. For example, 25% is 0.25.',
    ruleAngles:'Angles', ruleAnglesText:'Trigonometric functions use DEG (degrees) by default. Switch to RAD for radians.',
    ruleVerify:'Check important results', ruleVerifyText:'Independently verify important results before relying on them.',
    ruleResponsible:'Responsible use', ruleResponsibleText:'Use the tool thoughtfully and at your own discretion.',
    ruleSecurity:'Use of the site', ruleSecurityText:'Attempts to disrupt, damage, or bypass the site are prohibited.',
    termsText:'Adam Calculator is a free personal tool, not a service provided by a company. By using the site, you accept these terms. You may use the calculator for ordinary personal calculations. Results are computed locally and may be inaccurate; verify them before relying on them, especially in professional, financial, or safety-critical settings. The service is provided without warranties, and its creator disclaims liability for consequences of use to the extent permitted by law. The site name, content, and code remain subject to the rights of their respective owners. The service or these terms may change without notice. Continuous availability is not guaranteed. For questions, contact its creator, Adam Eddahbi.',
    termsAcceptance:'Acceptance of terms', termsAcceptanceText:'By using the site, you agree to these terms.',
    termsUse:'Use of the service', termsUseText:'You may use the calculator for ordinary personal calculations. Attempts to disrupt or bypass the site are prohibited.',
    termsAccuracy:'Accuracy of results', termsAccuracyText:'Results are provided for guidance and may contain errors or rounding.',
    termsResponsibility:'Responsibility', termsResponsibilityText:'Verify important results. To the extent permitted by law, the creator disclaims liability related to use of the tool.',
    termsIntellectual:'Intellectual property', termsIntellectualText:'The name, content, and code are subject to the rights of their respective owners. Adam Calculator does not claim to be a registered company.',
    termsChanges:'Service changes', termsChangesText:'The service and its terms may change to correct or improve the application.',
    termsAvailability:'Availability', termsAvailabilityText:'The service is provided free of charge without a guarantee of continuous operation or availability.',
    termsContact:'Contact', termsContactText:'For questions, contact the creator through the Replit project channel used to share the calculator with you.',
    creditsText:'Adam Calculator — Created by Adam Eddahbi. Made with care for the web, using open-source tools. Thank you for using it.',
    language:'Language', appearance:'Appearance', darkMode:'Dark theme', darkHint:'A softer palette for low-light surroundings.',
    angleSetting:'Angle unit', clearHistory:'Clear history',
    animations:'Animations', animationsHint:'Subtle transitions between interactions.', close:'Close', chooseLanguage:'Choose a language', light:'Light', dark:'Dark',
    errorSyntax:'Invalid expression', errorDivide:'Cannot divide by zero', errorDomain:'Value outside the function domain', errorNumber:'Result is not finite',
    copy:'Copy result', copied:'Copied', clearEntry:'Clear', delete:'Backspace', allClear:'Clear all', decimal:'Decimal',
    menu:'Open menu', languageMenu:'Change language', author:'Created by Adam Eddahbi', copyright:'© 2026 Adam Calculator',
    sin:'sin', cos:'cos', tan:'tan', asin:'sin⁻¹', acos:'cos⁻¹', atan:'tan⁻¹', log:'log', ln:'ln', exp:'exp', sqrt:'√', square:'x²', power:'xʸ', inverse:'1/x', factorial:'n!', abs:'|x|', modulo:'mod', floor:'⌊x⌋', ceil:'⌈x⌉', round:'round',
    pi:'Pi', euler:'Euler', sqrt2:'Square root of 2', phi:'Golden ratio',
    lengthM:'Meter', lengthKm:'Kilometer', lengthCm:'Centimeter', lengthMi:'Mile', lengthFt:'Foot', lengthIn:'Inch',
    massKg:'Kilogram', massG:'Gram', massLb:'Pound', massOz:'Ounce',
    tempC:'Celsius', tempF:'Fahrenheit', tempK:'Kelvin',
    volL:'Liter', volMl:'Milliliter', volM3:'Cubic meter', volGal:'US gallon',
    timeS:'Second', timeMin:'Minute', timeH:'Hour', timeDay:'Day',
    referencePi:'π ≈ 3.141592653589793 — the ratio of a circle’s circumference to its diameter.',
    referenceE:'e ≈ 2.718281828459045 — the base of natural logarithms.',
    referenceGolden:'φ ≈ 1.618033988749895 — the golden ratio, the positive solution to x² − x − 1 = 0.',
    referenceConversions:'1 inch = 2.54 cm · 1 mile = 1.609344 km · 1 pound = 0.45359237 kg.',
    referenceSin:'sin(x) — the sine of angle x.',
    referenceCos:'cos(x) — the cosine of angle x.',
    referenceTan:'tan(x) — the tangent of angle x.',
    referenceLog:'log(x) — the common logarithm (base 10).',
    referenceLn:'ln(x) — the natural logarithm (base e).',
    referenceSquare:'x² — the square of x, or x multiplied by itself.',
    referenceSqrt:'√x — the principal square root of x.',
    referencePower:'xʸ — x raised to the power y.',
    referenceAngles:'Angles use degrees (DEG) or radians (RAD), according to the setting.',
  },
  es: {
    calculator:'Calculadora', subtitle:'Un instrumento pensado para las matemáticas diarias.', basic:'Modo básico', scientific:'Científica', advanced:'Avanzada',
    tools:'Herramientas', information:'Información',
    ready:'LISTA PARA CALCULAR', angle:'ÁNGULO', degrees:'DEG', radians:'RAD', memory:'Cálculo instantáneo', expression:'Expresión',
    history:'Historial', clear:'Borrar', noHistory:'El historial está vacío', historyHint:'Tus próximos cálculos aparecerán aquí.',
    converter:'Conversiones', convertHint:'Convierte unidades de uso diario.', quantity:'Magnitud', from:'De', to:'A', value:'Valor', result:'Resultado',
    length:'Longitud', mass:'Masa', temperature:'Temperatura', volume:'Volumen', time:'Tiempo',
    constants:'Constantes', constantsHint:'Selecciona una constante para insertarla en el cálculo.',
    references:'Referencias', referencesText:'Algunos datos útiles para tus cálculos.',
    about:'Acerca de', rules:'Reglas de cálculo', terms:'Términos del servicio', credits:'Créditos', settings:'Ajustes',
    aboutText:'Adam Calculator es una calculadora web personal diseñada y creada por Adam Eddahbi. Una herramienta discreta, rápida y fiable para el día a día, con funciones científicas a mano. Tus cálculos y ajustes permanecen en tu navegador.',
    rulesIntro:'La calculadora sigue las convenciones matemáticas habituales, sin aproximaciones ocultas.',
    ruleOrder:'Orden de las operaciones', ruleOrderText:'Primero se evalúan los paréntesis, después las funciones, las potencias, las multiplicaciones y divisiones, y por último las sumas y restas. Las potencias se asocian de derecha a izquierda.',
    rulePercent:'Porcentajes', rulePercentText:'El símbolo % convierte el valor anterior en una fracción sobre 100. Por ejemplo, 25% equivale a 0,25.',
    ruleAngles:'Ángulos', ruleAnglesText:'Las funciones trigonométricas usan DEG (grados) de forma predeterminada. Cambia a RAD para usar radianes.',
    ruleVerify:'Comprueba los resultados', ruleVerifyText:'Verifica por separado los resultados importantes antes de utilizarlos.',
    ruleResponsible:'Uso responsable', ruleResponsibleText:'Utiliza la herramienta con criterio y bajo tu propia responsabilidad.',
    ruleSecurity:'Uso del sitio', ruleSecurityText:'Está prohibido intentar interrumpir, dañar o eludir el funcionamiento del sitio.',
    termsText:'Adam Calculator es una herramienta personal gratuita, no un servicio prestado por una empresa. Al utilizar el sitio, aceptas estas condiciones. Puedes usar la calculadora para cálculos personales habituales. Los resultados se calculan localmente y pueden ser inexactos; verifícalos antes de confiar en ellos, especialmente en contextos profesionales, financieros o de seguridad. El servicio se ofrece sin garantías y su creador declina toda responsabilidad por las consecuencias de su uso, dentro de los límites legales. El nombre, el contenido y el código del sitio están sujetos a los derechos de sus respectivos titulares. El servicio o estas condiciones pueden cambiar sin previo aviso. No se garantiza la disponibilidad continua. Para cualquier consulta, ponte en contacto con su creador, Adam Eddahbi.',
    termsAcceptance:'Aceptación de las condiciones', termsAcceptanceText:'Al utilizar el sitio, aceptas estas condiciones.',
    termsUse:'Uso del servicio', termsUseText:'Puedes usar la calculadora para cálculos personales habituales. Está prohibido intentar interrumpir o eludir el funcionamiento del sitio.',
    termsAccuracy:'Exactitud de los resultados', termsAccuracyText:'Los resultados son orientativos y pueden contener errores o redondeos.',
    termsResponsibility:'Responsabilidad', termsResponsibilityText:'Verifica los resultados importantes. Dentro de los límites legales, el creador declina toda responsabilidad derivada del uso de la herramienta.',
    termsIntellectual:'Propiedad intelectual', termsIntellectualText:'El nombre, el contenido y el código están sujetos a los derechos de sus respectivos titulares. Adam Calculator no afirma ser una empresa registrada.',
    termsChanges:'Cambios del servicio', termsChangesText:'El servicio y estas condiciones pueden cambiar para corregir o mejorar la aplicación.',
    termsAvailability:'Disponibilidad', termsAvailabilityText:'El servicio se ofrece gratuitamente y sin garantía de funcionamiento o disponibilidad continuos.',
    termsContact:'Contacto', termsContactText:'Para cualquier consulta, contacta con el creador a través del canal del proyecto de Replit por el que recibiste la calculadora.',
    creditsText:'Adam Calculator — Creada por Adam Eddahbi. Desarrollada con cuidado para la web y con herramientas de código abierto. Gracias por usarla.',
    language:'Idioma', appearance:'Apariencia', darkMode:'Tema oscuro', darkHint:'Una paleta más suave para entornos con poca luz.',
    angleSetting:'Unidad angular', clearHistory:'Borrar el historial',
    animations:'Animaciones', animationsHint:'Transiciones sutiles entre interacciones.', close:'Cerrar', chooseLanguage:'Elige un idioma', light:'Claro', dark:'Oscuro',
    errorSyntax:'Expresión no válida', errorDivide:'No se puede dividir entre cero', errorDomain:'Valor fuera del dominio de la función', errorNumber:'El resultado no es finito',
    copy:'Copiar resultado', copied:'Copiado', clearEntry:'Borrar', delete:'Retroceso', allClear:'Borrar todo', decimal:'Decimal',
    menu:'Abrir menú', languageMenu:'Cambiar idioma', author:'Creado por Adam Eddahbi', copyright:'© 2026 Adam Calculator',
    sin:'sen', cos:'cos', tan:'tan', asin:'sen⁻¹', acos:'cos⁻¹', atan:'tan⁻¹', log:'log', ln:'ln', exp:'exp', sqrt:'√', square:'x²', power:'xʸ', inverse:'1/x', factorial:'n!', abs:'|x|', modulo:'mod', floor:'⌊x⌋', ceil:'⌈x⌉', round:'redondeo',
    pi:'Pi', euler:'Euler', sqrt2:'Raíz de 2', phi:'Proporción áurea',
    lengthM:'Metro', lengthKm:'Kilómetro', lengthCm:'Centímetro', lengthMi:'Milla', lengthFt:'Pie', lengthIn:'Pulgada',
    massKg:'Kilogramo', massG:'Gramo', massLb:'Libra', massOz:'Onza',
    tempC:'Celsius', tempF:'Fahrenheit', tempK:'Kelvin',
    volL:'Litro', volMl:'Mililitro', volM3:'Metro cúbico', volGal:'Galón US',
    timeS:'Segundo', timeMin:'Minuto', timeH:'Hora', timeDay:'Día',
    referencePi:'π ≈ 3,141592653589793 — relación entre la circunferencia y el diámetro de un círculo.',
    referenceE:'e ≈ 2,718281828459045 — base de los logaritmos naturales.',
    referenceGolden:'φ ≈ 1,618033988749895 — proporción áurea, solución positiva de x² − x − 1 = 0.',
    referenceConversions:'1 pulgada = 2,54 cm · 1 milla = 1,609344 km · 1 libra = 0,45359237 kg.',
    referenceSin:'sen(x) — seno del ángulo x.',
    referenceCos:'cos(x) — coseno del ángulo x.',
    referenceTan:'tan(x) — tangente del ángulo x.',
    referenceLog:'log(x) — logaritmo decimal (base 10).',
    referenceLn:'ln(x) — logaritmo natural (base e).',
    referenceSquare:'x² — el cuadrado de x, es decir, x multiplicado por sí mismo.',
    referenceSqrt:'√x — raíz cuadrada principal de x.',
    referencePower:'xʸ — x elevado a la potencia y.',
    referenceAngles:'Los ángulos se expresan en grados (DEG) o radianes (RAD), según el ajuste.',
  },
  ar: {
    calculator:'آلة حاسبة', subtitle:'أداة متقنة للحساب اليومي.', basic:'الوضع الأساسي', scientific:'علمي', advanced:'متقدم',
    tools:'الأدوات', information:'المعلومات',
    ready:'جاهزة للحساب', angle:'الزاوية', degrees:'درجة', radians:'راديان', memory:'حساب فوري', expression:'التعبير',
    history:'السجل', clear:'مسح', noHistory:'السجل فارغ', historyHint:'ستظهر عملياتك التالية هنا.',
    converter:'تحويل الوحدات', convertHint:'حوّل وحداتك اليومية بسهولة.', quantity:'الكمية', from:'من', to:'إلى', value:'القيمة', result:'النتيجة',
    length:'الطول', mass:'الكتلة', temperature:'درجة الحرارة', volume:'الحجم', time:'الوقت',
    constants:'الثوابت', constantsHint:'اختر ثابتاً لإضافته إلى العملية الحسابية.',
    references:'مراجع', referencesText:'معلومات مفيدة لحساباتك.',
    about:'حول التطبيق', rules:'قواعد الحساب', terms:'شروط الاستخدام', credits:'الشكر والتقدير', settings:'الإعدادات',
    aboutText:'Adam Calculator آلة حاسبة شخصية على الويب صممها وأنشأها Adam Eddahbi. أداة هادئة وسريعة وموثوقة للحساب اليومي، مع وظائف علمية في متناول اليد. تبقى حساباتك وإعداداتك في متصفحك.',
    rulesIntro:'تتبع الآلة الحاسبة القواعد الرياضية المألوفة دون تقريب خفي.',
    ruleOrder:'ترتيب العمليات', ruleOrderText:'تُحسب الأقواس أولاً، ثم الدوال، ثم القوى، فالضرب والقسمة، ثم الجمع والطرح. تُحسب القوى من اليمين إلى اليسار.',
    rulePercent:'النسب المئوية', rulePercentText:'تحوّل علامة % القيمة السابقة إلى كسر من مئة. مثلاً، 25% تساوي 0.25.',
    ruleAngles:'الزوايا', ruleAnglesText:'تستخدم الدوال المثلثية وضع DEG (الدرجات) افتراضياً. بدّل إلى RAD لاستخدام الراديان.',
    ruleVerify:'تحقّق من النتائج', ruleVerifyText:'تحقّق بشكل مستقل من النتائج المهمة قبل الاعتماد عليها.',
    ruleResponsible:'الاستخدام المسؤول', ruleResponsibleText:'استخدم الأداة بتأنٍ وعلى مسؤوليتك.',
    ruleSecurity:'استخدام الموقع', ruleSecurityText:'يُحظر محاولة تعطيل الموقع أو إتلافه أو تجاوز طريقة عمله.',
    termsText:'Adam Calculator أداة شخصية مجانية وليست خدمة مقدمة من شركة. باستخدامك للموقع، فإنك توافق على هذه الشروط. يمكنك استخدام الآلة الحاسبة للحسابات الشخصية المعتادة. تُحسب النتائج محلياً وقد لا تكون دقيقة؛ تحقّق منها قبل الاعتماد عليها، خاصة في السياقات المهنية أو المالية أو المتعلقة بالسلامة. تُقدّم الخدمة دون ضمانات، ويخلي منشئها مسؤوليته عن عواقب استخدامها بالقدر الذي يسمح به القانون. يخضع اسم الموقع ومحتواه ورمزه لحقوق أصحابها. قد تتغير الخدمة أو هذه الشروط دون إشعار مسبق. لا نضمن استمرار توفر الخدمة. للاستفسارات، تواصل مع منشئها Adam Eddahbi.',
    termsAcceptance:'قبول الشروط', termsAcceptanceText:'باستخدام الموقع، فإنك توافق على هذه الشروط.',
    termsUse:'استخدام الخدمة', termsUseText:'يمكنك استخدام الآلة الحاسبة للحسابات الشخصية المعتادة. يُحظر محاولة تعطيل الموقع أو تجاوز طريقة عمله.',
    termsAccuracy:'دقة النتائج', termsAccuracyText:'النتائج إرشادية وقد تتضمن أخطاء أو تقريباً.',
    termsResponsibility:'المسؤولية', termsResponsibilityText:'تحقّق من النتائج المهمة. يخلي المنشئ مسؤوليته عن استخدام الأداة بالقدر الذي يسمح به القانون.',
    termsIntellectual:'الملكية الفكرية', termsIntellectualText:'يخضع الاسم والمحتوى والرمز لحقوق أصحابها. لا يدّعي Adam Calculator أنه شركة مسجلة.',
    termsChanges:'تغييرات الخدمة', termsChangesText:'قد تتغير الخدمة وشروطها لتصحيح التطبيق أو تحسينه.',
    termsAvailability:'التوفر', termsAvailabilityText:'تُقدّم الخدمة مجاناً دون ضمان لاستمرار عملها أو توفرها.',
    termsContact:'التواصل', termsContactText:'للاستفسارات، تواصل مع المنشئ Adam Eddahbi عبر قناة مشروع Replit التي شاركك من خلالها الآلة الحاسبة.',
    creditsText:'Adam Calculator — أنشأه Adam Eddahbi. طُوّر بعناية للويب باستخدام أدوات مفتوحة المصدر. شكراً لاستخدامك.',
    language:'اللغة', appearance:'المظهر', darkMode:'المظهر الداكن', darkHint:'ألوان مريحة في الإضاءة المنخفضة.',
    angleSetting:'وحدة الزاوية', clearHistory:'مسح السجل',
    animations:'الحركات', animationsHint:'انتقالات هادئة بين التفاعلات.', close:'إغلاق', chooseLanguage:'اختر اللغة', light:'فاتح', dark:'داكن',
    errorSyntax:'تعبير غير صالح', errorDivide:'لا يمكن القسمة على صفر', errorDomain:'القيمة خارج مجال الدالة', errorNumber:'النتيجة ليست عدداً منتهياً',
    copy:'نسخ النتيجة', copied:'تم النسخ', clearEntry:'مسح', delete:'حذف للخلف', allClear:'مسح الكل', decimal:'فاصلة عشرية',
    menu:'فتح القائمة', languageMenu:'تغيير اللغة', author:'أنشأه Adam Eddahbi', copyright:'© 2026 Adam Calculator',
    sin:'جا', cos:'جتا', tan:'ظا', asin:'جا⁻¹', acos:'جتا⁻¹', atan:'ظا⁻¹', log:'لوغ', ln:'لن', exp:'أس', sqrt:'√', square:'x²', power:'xʸ', inverse:'1/x', factorial:'n!', abs:'|x|', modulo:'باقي القسمة', floor:'⌊x⌋', ceil:'⌈x⌉', round:'تقريب',
    pi:'باي', euler:'أويلر', sqrt2:'الجذر التربيعي لـ 2', phi:'النسبة الذهبية',
    lengthM:'متر', lengthKm:'كيلومتر', lengthCm:'سنتيمتر', lengthMi:'ميل', lengthFt:'قدم', lengthIn:'بوصة',
    massKg:'كيلوغرام', massG:'غرام', massLb:'رطل', massOz:'أونصة',
    tempC:'مئوية', tempF:'فهرنهايت', tempK:'كلفن',
    volL:'لتر', volMl:'مليلتر', volM3:'متر مكعب', volGal:'غالون أمريكي',
    timeS:'ثانية', timeMin:'دقيقة', timeH:'ساعة', timeDay:'يوم',
    referencePi:'π ≈ 3.141592653589793 — نسبة محيط الدائرة إلى قطرها.',
    referenceE:'e ≈ 2.718281828459045 — أساس اللوغاريتم الطبيعي.',
    referenceGolden:'φ ≈ 1.618033988749895 — النسبة الذهبية، الحل الموجب للمعادلة x² − x − 1 = 0.',
    referenceConversions:'1 بوصة = 2.54 سم · 1 ميل = 1.609344 كم · 1 رطل = 0.45359237 كغ.',
    referenceSin:'sin(x) — جيب الزاوية x.',
    referenceCos:'cos(x) — جيب تمام الزاوية x.',
    referenceTan:'tan(x) — ظل الزاوية x.',
    referenceLog:'log(x) — اللوغاريتم العشري (أساسه 10).',
    referenceLn:'ln(x) — اللوغاريتم الطبيعي (أساسه e).',
    referenceSquare:'x² — مربع x، أي ضربه في نفسه.',
    referenceSqrt:'√x — الجذر التربيعي الرئيسي للعدد x.',
    referencePower:'xʸ — رفع x إلى القوة y.',
    referenceAngles:'تُحسب الزوايا بالدرجات (DEG) أو بالراديان (RAD) حسب الإعداد.',
  },
};

const languages: { id: Language; flag: string; label: string }[] = [
  { id:'fr', flag:'🇫🇷', label:'Français' }, { id:'en', flag:'🇬🇧', label:'English' },
  { id:'es', flag:'🇪🇸', label:'Español' }, { id:'ar', flag:'🇸🇦', label:'العربية' },
];
const unitGroups: Record<string, { id: string; factor: number }[]> = {
  length:[{id:'lengthM',factor:1},{id:'lengthKm',factor:1000},{id:'lengthCm',factor:.01},{id:'lengthMi',factor:1609.344},{id:'lengthFt',factor:.3048},{id:'lengthIn',factor:.0254}],
  mass:[{id:'massKg',factor:1},{id:'massG',factor:.001},{id:'massLb',factor:.45359237},{id:'massOz',factor:.028349523125}],
  volume:[{id:'volL',factor:1},{id:'volMl',factor:.001},{id:'volM3',factor:1000},{id:'volGal',factor:3.785411784}],
  time:[{id:'timeS',factor:1},{id:'timeMin',factor:60},{id:'timeH',factor:3600},{id:'timeDay',factor:86400}],
  temperature:[{id:'tempC',factor:1},{id:'tempF',factor:1},{id:'tempK',factor:1}],
};
const constants = [
  {id:'pi', labelKey:'pi', value:'pi', shown:'π'},
  {id:'e', labelKey:'euler', value:'e', shown:'e'},
  {id:'sqrt2', labelKey:'sqrt2', value:'sqrt(2)', shown:'√2'},
  {id:'phi', labelKey:'phi', value:'1.618033988749895', shown:'φ'},
];

function calculate(source: string, radians: boolean, answer = 0): number {
  const cleaned = source.trim().replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/,/g,'.').replace(/π/g,'pi');
  const tokenPattern = /\s*((?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[a-zA-Z]+|[+\-*/^()%!])/gy;
  const tokens: string[] = [];
  let index = 0;
  while (index < cleaned.length) {
    tokenPattern.lastIndex = index;
    const match = tokenPattern.exec(cleaned);
    if (!match) throw new Error('syntax');
    tokens.push(match[1]); index = tokenPattern.lastIndex;
  }
  let pos = 0;
  const peek = () => tokens[pos];
  const take = () => tokens[pos++];
  const angle = (x: number) => radians ? x : x * Math.PI / 180;
  const unangle = (x: number) => radians ? x : x * 180 / Math.PI;
  const functions: Record<string,(x:number)=>number> = {
    sin:x=>Math.sin(angle(x)), cos:x=>Math.cos(angle(x)), tan:x=>Math.tan(angle(x)),
    asin:x=>unangle(Math.asin(x)), acos:x=>unangle(Math.acos(x)), atan:x=>unangle(Math.atan(x)),
    sqrt:Math.sqrt, abs:Math.abs, log:Math.log10, ln:Math.log, exp:Math.exp,
    floor:Math.floor, ceil:Math.ceil, round:Math.round,
  };
  const functionNames = new Set(Object.keys(functions));
  const isValueEnd = (token: string) => /^\d/.test(token) || ['pi','e','ans',')','!','%'].includes(token);
  const isValueStart = (token: string) => /^\d/.test(token) || ['pi','e','ans','('].includes(token) || functionNames.has(token);
  const joined: string[] = [];
  for (let i=0;i<tokens.length;i++) {
    const previous=tokens[i-1], current=tokens[i];
    if (previous && isValueEnd(previous) && isValueStart(current)) joined.push('*');
    joined.push(current);
  }
  tokens.splice(0,tokens.length,...joined);
  const factorial = (x:number) => {
    if (x < 0 || !Number.isInteger(x) || x > 170) throw new Error('domain');
    let result = 1; for(let n=2;n<=x;n++) result *= n; return result;
  };
  const primary = (): number => {
    const t = take();
    if (!t) throw new Error('syntax');
    if (t === '+' || t === '-') { const v = primary(); return t === '-' ? -v : v; }
    if (t === '(') { const v = add(); if (take() !== ')') throw new Error('syntax'); return v; }
    if (/^\d/.test(t)) return Number(t);
    if (t === 'pi') return Math.PI;
    if (t === 'e') return Math.E;
    if (t === 'ans') return answer;
    if (functions[t]) {
      if (take() !== '(') throw new Error('syntax');
      const v = add(); if (take() !== ')') throw new Error('syntax');
      const out = functions[t](v); if (Number.isNaN(out)) throw new Error('domain'); return out;
    }
    throw new Error('syntax');
  };
  const postfix = (): number => {
    let value = primary();
    while (peek() === '%' || peek() === '!') {
      const op = take();
      value = op === '%' ? value / 100 : factorial(value);
    }
    return value;
  };
  const power = (): number => {
    const left = postfix();
    if (peek() === '^') { take(); return left ** unary(); }
    return left;
  };
  const unary = (): number => {
    if (peek() === '+' || peek() === '-') { const op=take(); const v=unary(); return op==='-'?-v:v; }
    return power();
  };
  const multiply = (): number => {
    let v = unary();
    while (peek() === '*' || peek() === '/' || peek() === 'mod') {
      const op=take(), rhs=unary();
      if((op==='/' || op==='mod') && rhs===0) throw new Error('divide');
      v=op==='*'?v*rhs:op==='mod'?v%rhs:v/rhs;
    }
    return v;
  };
  const add = (): number => {
    let v=multiply();
    while(peek()==='+'||peek()==='-'){const op=take(),rhs=multiply();v=op==='+'?v+rhs:v-rhs;}
    return v;
  };
  if (!tokens.length) return 0;
  const result = add();
  if (pos !== tokens.length) throw new Error('syntax');
  if (!Number.isFinite(result)) throw new Error('number');
  return result;
}

function App() {
  const [lang,setLang] = useState<Language>(() => {
    const saved=localStorage.getItem('adam-language');
    return saved==='en'||saved==='es'||saved==='ar'||saved==='fr'?saved:'fr';
  });
  const [dark,setDark] = useState(() => localStorage.getItem('adam-dark') === 'true');
  const [motion,setMotion] = useState(() => localStorage.getItem('adam-motion') !== 'false');
  const [mode,setMode] = useState<Mode>('basic');
  const [screen,setScreen] = useState<Screen>('calculator');
  const [expression,setExpression] = useState('');
  const [error,setError] = useState('');
  const [result,setResult] = useState('');
  const [radians,setRadians] = useState(() => localStorage.getItem('adam-radians') === 'true');
  const [drawer,setDrawer] = useState(false);
  const [modal,setModal] = useState<'language'|null>(null);
  const [history,setHistory] = useState<HistoryEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem('adam-history') || '[]') as HistoryEntry[]; } catch { return []; }
  });
  const [group,setGroup] = useState('length');
  const [unitFrom,setUnitFrom] = useState('lengthM');
  const [unitTo,setUnitTo] = useState('lengthKm');
  const [unitValue,setUnitValue] = useState('1');
  const [copied,setCopied] = useState(false);
  const t = (key:string) => words[lang][key] || words.en[key] || key;
  const rtl = lang === 'ar';

  useEffect(() => { localStorage.setItem('adam-language',lang); document.documentElement.lang=lang; document.documentElement.dir=rtl?'rtl':'ltr'; },[lang,rtl]);
  useEffect(() => { localStorage.setItem('adam-dark',String(dark)); document.documentElement.classList.toggle('dark',dark); },[dark]);
  useEffect(() => { localStorage.setItem('adam-motion',String(motion)); document.documentElement.classList.toggle('no-motion',!motion); },[motion]);
  useEffect(() => { localStorage.setItem('adam-radians',String(radians)); },[radians]);
  useEffect(() => { localStorage.setItem('adam-history',JSON.stringify(history)); },[history]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setDrawer(false); setModal(null); return; }
      if (modal || screen !== 'calculator') return;
      if (/^[0-9]$/.test(event.key) || ['.','+','-','*','/','^','(',')','%'].includes(event.key)) { event.preventDefault(); append(event.key); }
      else if (event.key === 'Enter' || event.key === '=') { event.preventDefault(); solve(); }
      else if (event.key === 'Backspace') { event.preventDefault(); removeLast(); }
      else if (event.key === 'Delete') clearAll();
    };
    window.addEventListener('keydown',onKey); return () => window.removeEventListener('keydown',onKey);
  });

  const append = (value:string) => { setError(''); setExpression(prev => prev + value); };
  const clearAll = () => { setExpression(''); setResult(''); setError(''); };
  const removeLast = () => { setError(''); setExpression(prev => prev.slice(0,-1)); };
  const solve = () => {
    try {
      const output=calculate(expression,radians,Number(result)||0);
      const formatted=Number(output.toPrecision(12)).toString();
      setResult(formatted); setError('');
      if(expression.trim()) setHistory(prev => [{id:`${Date.now()}-${Math.random()}`,expression,result:formatted},...prev].slice(0,40));
    } catch (e) {
      const code = e instanceof Error ? e.message : 'syntax';
      setError(t(code === 'divide' ? 'errorDivide' : code === 'domain' ? 'errorDomain' : code === 'number' ? 'errorNumber' : 'errorSyntax'));
    }
  };
  const useHistory = (item:HistoryEntry) => { setExpression(item.expression); setResult(item.result); setError(''); setScreen('calculator'); };
  const insertConstant = (value:string) => { setScreen('calculator'); setExpression(prev=>prev+value); setError(''); };
  const screenTitle = screen === 'calculator' ? t('calculator') : t(screen);
  const conversionOutput = useMemo(() => {
    const n=Number(unitValue);
    if(!Number.isFinite(n)) return '—';
    if(group==='temperature') {
      const c=unitFrom==='tempF'?(n-32)*5/9:unitFrom==='tempK'?n-273.15:n;
      const out=unitTo==='tempF'?c*9/5+32:unitTo==='tempK'?c+273.15:c;
      return Number(out.toPrecision(10)).toLocaleString(lang==='fr'?'fr-FR':lang==='es'?'es-ES':lang==='ar'?'ar':'en-US');
    }
    const all=unitGroups[group] || unitGroups.length;
    const resultN=n*(all.find(x=>x.id===unitFrom)?.factor||1)/(all.find(x=>x.id===unitTo)?.factor||1);
    return Number(resultN.toPrecision(10)).toLocaleString(lang==='fr'?'fr-FR':lang==='es'?'es-ES':lang==='ar'?'ar':'en-US');
  },[unitFrom,unitTo,unitValue,group,lang]);
  const selectGroup = (next:string) => {
    setGroup(next);
    const items=unitGroups[next] || unitGroups.length;
    setUnitFrom(items[0].id); setUnitTo(items[1]?.id || items[0].id);
  };
  const units=unitGroups[group] || unitGroups.length;

  const navItems: {id:Screen; icon: typeof Calculator}[] = [
    {id:'calculator',icon:Calculator},{id:'history',icon:History},
    {id:'converter',icon:ArrowLeftRight},{id:'constants',icon:FlaskConical},{id:'references',icon:BookOpen},
    {id:'about',icon:Info},{id:'rules',icon:AlignLeft},{id:'terms',icon:Shield},{id:'credits',icon:Check},{id:'settings',icon:Settings2},
  ];
  const menuGroups: {label:string;items:Screen[]}[] = [
    {label:'calculator',items:['calculator','history']},
    {label:'tools',items:['converter','constants','references']},
    {label:'information',items:['about','rules','terms','credits']},
    {label:'settings',items:['settings']},
  ];
  const calcKey = (label:string, value:string, cls='') => <button key={`${label}-${value}`} type="button" data-testid={`key-${value}`} aria-label={label} className={`key ${cls}`} onClick={()=>{
    if(value==='AC') clearAll();
    else if(value==='DEL') removeLast();
    else if(value==='=') solve();
    else if(value==='NEG') { setError(''); setExpression(prev=>prev ? `(${prev})*-1` : '-'); }
    else if(value==='SQUARE') append('^2');
    else if(value==='SQRT') append('sqrt(');
    else if(value==='INV') { setError(''); setExpression(prev=>prev ? `1/(${prev})` : '1/('); }
    else if(value==='MOD') append(' mod ');
    else append(value);
  }}>{label}</button>;
  const scientificKeys: [string,string][] = [
    ['sin','sin('],['cos','cos('],['tan','tan('],['asin','asin('],['acos','acos('],['atan','atan('],
    ['log','log('],['ln','ln('],['exp','exp('],['sqrt','sqrt('],['square','^2'],['power','^'],
    ['inverse','INV'],['factorial','!'],['abs','abs('],['modulo','MOD'],['pi','pi'],['e','e'],['(', '('],[')',')'],
  ];
  const extendedKeys: [string,string][] = [
    ...scientificKeys,['floor','floor('],['ceil','ceil('],['round','round('],
  ];
  const useCopy = async () => { if(result){try{await navigator.clipboard.writeText(result);setCopied(true);window.setTimeout(()=>setCopied(false),1300);}catch{setCopied(false);}} };

  return <div className="app-shell" dir={rtl?'rtl':'ltr'}>
    <header className="topbar">
      <div className="brand"><button className="icon-button" onClick={()=>setDrawer(true)} aria-label={t('menu')} data-testid="button-open-menu"><Menu size={19}/></button><div className="brand-mark">A</div><span className="brand-name">Adam Calculator</span></div>
      <div className="top-actions">
        <button className="language-trigger" onClick={()=>setModal('language')} aria-label={t('languageMenu')} data-testid="button-language"><Globe2 size={16}/><span>{languages.find(x=>x.id===lang)?.flag}</span><span className="mobile-hide">{lang.toUpperCase()}</span><ChevronDown size={13}/></button>
        <button className="icon-button" onClick={()=>setDark(v=>!v)} aria-label={dark?t('light'):t('dark')} data-testid="button-theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
      </div>
    </header>
    <main className="page-wrap">
      <div className="intro-row">
        <div><div className="eyebrow">{t('author')}</div><h1 className="page-title">{screenTitle}</h1><p className="subtitle">{screen==='calculator'?t('subtitle'):screen==='converter'?t('convertHint'):screen==='constants'?t('constantsHint'):screen==='references'?t('referencesText'):screen==='history'?t('historyHint'):''}</p></div>
        {screen==='calculator'&&<div className="mode-switch" role="tablist" aria-label={t('calculator')}>{(['basic','scientific','advanced'] as Mode[]).map(m=><button type="button" role="tab" aria-selected={mode===m} className={mode===m?'active':''} key={m} onClick={()=>setMode(m)} data-testid={`mode-${m}`}>{t(m)}</button>)}</div>}
      </div>
      {screen==='calculator'&&<div className="workspace">
        <section className="panel calc-panel" aria-label={t('calculator')}>
          <div className="display" aria-live="polite">
            <div className="display-top"><span>{t('ready')}</span><span>{t('expression')}</span></div>
            <div className="display-expression">{expression || ' '}</div>
            <div className={`display-result ${error?'error':''}`} data-testid="text-calculator-result">{error||result||'0'}</div>
            <div className="display-footer"><span>{t('memory')}</span><div style={{display:'flex',alignItems:'center',gap:9}}><button className="angle-toggle" onClick={useCopy} aria-label={t('copy')} data-testid="button-copy-result"><Copy size={14}/>{copied?t('copied'):''}</button><button className="angle-toggle" onClick={()=>setRadians(v=>!v)} data-testid="button-angle">{t('angle')} · {radians?t('radians'):t('degrees')}</button></div></div>
          </div>
          {mode!=='basic'&&<div className="advanced-keys">
            {(mode==='advanced'?extendedKeys:scientificKeys).map(([label,val])=>calcKey(t(label)||label,val,'utility small'))}
          </div>}
          <div className="keypad">
            {calcKey(t('allClear'),'AC','utility')}{calcKey('±','NEG','utility')}{calcKey('%','%','utility')}{calcKey('÷','/','operator')}
            {calcKey('7','7')}{calcKey('8','8')}{calcKey('9','9')}{calcKey('×','*','operator')}
            {calcKey('4','4')}{calcKey('5','5')}{calcKey('6','6')}{calcKey('−','-','operator')}
            {calcKey('1','1')}{calcKey('2','2')}{calcKey('3','3')}{calcKey('+','+','operator')}
            {calcKey('(','(','utility')}{calcKey(')',')','utility')}{calcKey(t('square'),'SQUARE','utility')}{calcKey(t('sqrt'),'SQRT','utility')}
            {calcKey('⌫','DEL','utility')}{calcKey('0','0','wide')}{calcKey(lang==='fr'||lang==='es'?',':'.','.')}{calcKey('=','=','equals wide-full')}
          </div>
        </section>
        <section className="panel utility-panel">
          <div className="section-head"><h2 className="section-title">{t('history')}</h2>{history.length>0&&<button className="text-button" onClick={()=>setHistory([])} data-testid="button-clear-history">{t('clear')}</button>}</div>
          {history.length===0?<div className="empty-state"><div className="empty-mark"><History size={20}/></div><strong>{t('noHistory')}</strong><span>{t('historyHint')}</span></div>:<div className="history-list">{history.map(item=><button className="history-item" key={item.id} onClick={()=>useHistory(item)} data-testid={`history-item-${item.id}`}><span className="history-expression">{item.expression}</span><span className="history-result">= {item.result}</span></button>)}</div>}
          <div style={{marginTop:22,borderTop:'1px solid hsl(var(--border) / .7)',paddingTop:17}}><div className="section-head"><h2 className="section-title">{t('constants')}</h2><button className="text-button" onClick={()=>setScreen('constants')}>{t('references')}</button></div><div className="constants-row">{constants.map(c=><button className="constant-chip" key={c.id} onClick={()=>insertConstant(c.value)} data-testid={`constant-${c.id}`} title={t(c.labelKey)}>{c.shown}</button>)}</div></div>
        </section>
      </div>}
       {screen==='history'&&<section className="panel tool-panel"><div className="section-head"><h2 className="section-title">{t('history')}</h2>{history.length>0&&<button className="text-button" onClick={()=>setHistory([])} data-testid="button-clear-history-page">{t('clear')}</button>}</div>
         {history.length===0?<div className="empty-state"><div className="empty-mark"><History size={20}/></div><strong>{t('noHistory')}</strong><span>{t('historyHint')}</span></div>:<div className="history-list">{history.map(item=><button className="history-item" key={item.id} onClick={()=>useHistory(item)} data-testid={`history-page-item-${item.id}`}><span className="history-expression">{item.expression}</span><span className="history-result">= {item.result}</span></button>)}</div>}
       </section>}
       {screen==='converter'&&<div className="below-grid" style={{gridTemplateColumns:'1fr'}}>
        <section className="panel tool-panel">
          <div className="section-head"><h2 className="section-title">{t('converter')}</h2><ArrowLeftRight size={19} color="hsl(var(--primary))"/></div>
          <label className="eyebrow" htmlFor="quantity-select">{t('quantity')}</label>
          <div className="tool-select-row"><select className="select-field" id="quantity-select" value={group} onChange={e=>selectGroup(e.target.value)} data-testid="select-quantity">{['length','mass','temperature','volume','time'].map(g=><option value={g} key={g}>{t(g)}</option>)}</select></div>
          <div className="below-grid" style={{marginTop:8}}>
            <label><span className="eyebrow">{t('value')}</span><input className="number-field" type="number" value={unitValue} onChange={e=>setUnitValue(e.target.value)} data-testid="input-conversion-value"/></label>
            <label><span className="eyebrow">{t('result')}</span><div className="conversion-result" data-testid="text-conversion-result">{conversionOutput}</div></label>
          </div>
          <div className="tool-select-row"><select className="select-field" aria-label={t('from')} value={unitFrom} onChange={e=>setUnitFrom(e.target.value)} data-testid="select-unit-from">{units.map(u=><option key={u.id} value={u.id}>{t(u.id)}</option>)}</select><ArrowLeftRight size={18}/><select className="select-field" aria-label={t('to')} value={unitTo} onChange={e=>setUnitTo(e.target.value)} data-testid="select-unit-to">{units.map(u=><option key={u.id} value={u.id}>{t(u.id)}</option>)}</select></div>
        </section>
      </div>}
      {screen==='constants'&&<section className="panel tool-panel"><div className="section-head"><h2 className="section-title">{t('constants')}</h2><FlaskConical size={20} color="hsl(var(--primary))"/></div><p className="subtitle">{t('constantsHint')}</p><div className="constants-row">{constants.map(c=><button className="constant-chip" key={c.id} onClick={()=>insertConstant(c.value)} data-testid={`constant-select-${c.id}`}><strong>{c.shown}</strong> · {t(c.labelKey)}</button>)}</div><button className="text-button" style={{marginTop:18}} onClick={()=>setScreen('calculator')}>{t('calculator')}</button></section>}
       {screen==='references'&&<section className="panel tool-panel"><div className="section-head"><h2 className="section-title">{t('references')}</h2><BookOpen size={20} color="hsl(var(--primary))"/></div><div className="settings-list">{['referenceSin','referenceCos','referenceTan','referenceLog','referenceLn','referencePi','referenceE','referenceSquare','referenceSqrt','referencePower','referenceAngles','referenceGolden','referenceConversions'].map((key,i)=><div className="setting-row" key={key}><div className="setting-copy"><strong>{['sin','cos','tan','log','ln','π','e','x²','√','xʸ','DEG / RAD','φ','↔'][i]}</strong><small>{t(key)}</small></div></div>)}</div></section>}
      {['about','rules','terms','credits'].includes(screen)&&<section className="panel tool-panel"><div className="section-head"><h2 className="section-title">{t(screen)}</h2><Info size={20} color="hsl(var(--primary))"/></div><div className="modal-copy">
        {screen==='about'&&<p>{t('aboutText')}</p>}
        {screen==='credits'&&<p>{t('creditsText')}</p>}
         {screen==='terms'&&<><p>{t('termsText')}</p>{(['termsAcceptance','termsUse','termsAccuracy','termsResponsibility','termsIntellectual','termsChanges','termsAvailability','termsContact'] as const).map(key=><section className="legal-section" key={key}><h3>{t(key)}</h3><p>{t(`${key}Text`)}</p></section>)}</>}
         {screen==='rules'&&<><p>{t('rulesIntro')}</p><h3>{t('ruleOrder')}</h3><p>{t('ruleOrderText')}</p><h3>{t('rulePercent')}</h3><p>{t('rulePercentText')}</p><h3>{t('ruleAngles')}</h3><p>{t('ruleAnglesText')}</p><h3>{t('ruleVerify')}</h3><p>{t('ruleVerifyText')}</p><h3>{t('ruleResponsible')}</h3><p>{t('ruleResponsibleText')}</p><h3>{t('ruleSecurity')}</h3><p>{t('ruleSecurityText')}</p></>}
      </div></section>}
      {screen==='settings'&&<section className="panel tool-panel"><div className="section-head"><h2 className="section-title">{t('settings')}</h2><Settings2 size={20} color="hsl(var(--primary))"/></div>
        <div className="settings-list">
          <div className="setting-row"><div className="setting-copy"><strong>{t('language')}</strong><small>{languages.find(x=>x.id===lang)?.label}</small></div><button className="language-trigger" onClick={()=>setModal('language')}><Languages size={16}/>{t('chooseLanguage')}</button></div>
          <div className="setting-row"><div className="setting-copy"><strong>{t('darkMode')}</strong><small>{t('darkHint')}</small></div><button className={`toggle ${dark?'on':''}`} role="switch" aria-checked={dark} aria-label={t('darkMode')} onClick={()=>setDark(v=>!v)}><span/></button></div>
          <div className="setting-row"><div className="setting-copy"><strong>{t('animations')}</strong><small>{t('animationsHint')}</small></div><button className={`toggle ${motion?'on':''}`} role="switch" aria-checked={motion} aria-label={t('animations')} onClick={()=>setMotion(v=>!v)}><span/></button></div>
          <div className="setting-row"><div className="setting-copy"><strong>{t('angleSetting')}</strong><small>{radians?t('radians'):t('degrees')}</small></div><button className="language-trigger" onClick={()=>setRadians(v=>!v)} aria-label={t('angleSetting')} data-testid="button-angle-setting">{radians?t('radians'):t('degrees')}</button></div>
          <div className="setting-row"><div className="setting-copy"><strong>{t('history')}</strong><small>{t('clearHistory')}</small></div><button className="text-button" onClick={()=>setHistory([])} data-testid="button-clear-history-settings">{t('clearHistory')}</button></div>
        </div>
      </section>}
      <footer className="footer"><span>{t('author')} · {t('copyright')}</span><div className="footer-links">{(['about','rules','terms','credits'] as Screen[]).map(id=><button key={id} onClick={()=>setScreen(id)} data-testid={`footer-${id}`}>{t(id)}</button>)}</div></footer>
    </main>
    <div className={`drawer-backdrop ${drawer?'open':''}`} onClick={()=>setDrawer(false)} aria-hidden="true"/>
    <aside className={`drawer ${drawer?'open':''}`} aria-label={t('menu')} aria-hidden={!drawer}>
      <div className="drawer-top"><div className="brand"><div className="brand-mark">A</div><span className="brand-name">Adam Calculator</span></div><button className="icon-button" onClick={()=>setDrawer(false)} aria-label={t('close')}><X size={18}/></button></div>
      <nav className="drawer-nav" aria-label={t('menu')}>
        {menuGroups.map(group=><div className="drawer-group" key={group.label}>
          <h2 className="drawer-section-title">{t(group.label)}</h2>
          {group.items.map(id=>{
            const Icon=navItems.find(item=>item.id===id)?.icon||Calculator;
            return <button key={id} className={screen===id?'current':''} onClick={()=>{setScreen(id);setDrawer(false);}} data-testid={`nav-${id}`}><Icon size={17}/><span>{t(id)}</span></button>;
          })}
          {group.label==='calculator'&&<div className="drawer-modes" aria-label={t('calculator')}>{(['basic','scientific','advanced'] as Mode[]).map(item=><button key={item} type="button" className={mode===item?'selected':''} aria-pressed={mode===item} onClick={()=>{setMode(item);setScreen('calculator');setDrawer(false);}} data-testid={`drawer-mode-${item}`}>{t(item)}</button>)}</div>}
        </div>)}
      </nav>
      <div className="drawer-caption">{t('author')}<br/>{t('copyright')}</div>
    </aside>
    {modal==='language'&&<div className="modal-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null);}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="language-title"><div className="modal-head"><h2 className="modal-title" id="language-title">{t('chooseLanguage')}</h2><button className="icon-button" onClick={()=>setModal(null)} aria-label={t('close')}><X size={18}/></button></div><div className="language-grid">{languages.map(l=><button key={l.id} className={`language-choice ${lang===l.id?'selected':''}`} onClick={()=>{setLang(l.id);setModal(null);}} data-testid={`language-${l.id}`}><span>{l.flag}</span><span>{l.label}</span>{lang===l.id&&<Check size={16}/>}</button>)}</div></section></div>}
  </div>;
}

export default App;
