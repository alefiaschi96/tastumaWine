PGDMP                         {           tastuma    15.2    15.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    24576    tastuma    DATABASE     z   CREATE DATABASE tastuma WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE tastuma;
                postgres    false                        2615    24577    tastuma    SCHEMA        CREATE SCHEMA tastuma;
    DROP SCHEMA tastuma;
                postgres    false            �            1259    24591    wine_id_seq    SEQUENCE     t   CREATE SEQUENCE public.wine_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.wine_id_seq;
       public          postgres    false            �            1259    24594    wine    TABLE     F  CREATE TABLE tastuma.wine (
    id integer NOT NULL,
    wine_name character varying(100),
    type character varying(100),
    region character varying(100),
    denomination character varying(100),
    menu_name character varying(100),
    company character varying(100),
    vine character varying(100),
    year character varying(100),
    reseller character varying(100),
    price double precision,
    sciolze_vinery bigint,
    tastuma_vinery bigint,
    service_temp character varying(100),
    fridge_temp character varying(100),
    fridge_type character varying(100)
);
    DROP TABLE tastuma.wine;
       tastuma         heap    postgres    false    6            �            1259    24593    wine_id_seq    SEQUENCE     �   CREATE SEQUENCE tastuma.wine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE tastuma.wine_id_seq;
       tastuma          postgres    false    6    217                       0    0    wine_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE tastuma.wine_id_seq OWNED BY tastuma.wine.id;
          tastuma          postgres    false    216            g           2604    24597    wine id    DEFAULT     d   ALTER TABLE ONLY tastuma.wine ALTER COLUMN id SET DEFAULT nextval('tastuma.wine_id_seq'::regclass);
 7   ALTER TABLE tastuma.wine ALTER COLUMN id DROP DEFAULT;
       tastuma          postgres    false    217    216    217            �          0    24594    wine 
   TABLE DATA           �   COPY tastuma.wine (id, wine_name, type, region, denomination, menu_name, company, vine, year, reseller, price, sciolze_vinery, tastuma_vinery, service_temp, fridge_temp, fridge_type) FROM stdin;
    tastuma          postgres    false    217   (                  0    0    wine_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.wine_id_seq', 212, true);
          public          postgres    false    215                       0    0    wine_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('tastuma.wine_id_seq', 217, true);
          tastuma          postgres    false    216            i           2606    24601    wine wine_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY tastuma.wine
    ADD CONSTRAINT wine_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY tastuma.wine DROP CONSTRAINT wine_pkey;
       tastuma            postgres    false    217            �      x��]͒�8r>SOd���F�,�ϱ���ՌZ�������nxXd�;}�k����|u�O֛�I�	�$~����lČ�Hf�D"3$�h�7����%o>n/HtV�9��EW�ʢa.�v�V��e������X�)XUF�,^��$�EY��g��_�
���#p�"�n��B��5�$ۜ�5ߕ�6U	�< C<Ӆm9+��l�*����9�Y��y���-�/�FW�j�tpz�I��:�A^u?��noy��Y�m�*�gQ:im���Jrƪ�OA֓L� 﫶���r��'�y��� ]yQf����<�X�7e��/'/ċ5��� k<�]D�eA��V���ȝƻ�ŞW(i��O�PV{;^�f�S[�h��et]� Qr`��?��mJ�)v�n*�3�eK_�=��Uŀ�m�xM_�3Zݲ�f4�5�d������Bu7",��b������*:�x���u[��$�r�����H��y�0�D�\U屬�	��P��b�鮬��j�����V{NM*�x�����gMá�U�� oY�'å&@P�'Z7���'`�YD�`'�\���	���P5n�� ����]�y���������_�gc��u�`)P:�uF������pdZ���6��i��\G.�����Iu�������Ϭ ��=�g?@� �}mm��Z�5�.A_�&�e�`�$3P����Q��Q��8y��o����s�����+~W�9t^)M��AG0N�R�\/_�&��F4��k�j@yGҗ��kfؐ�)�==���
�QYAw���v9�kFF�{QM�xE����^Rl���Q$�'�x��/��>���?�f/f�-=iR��\�-=����j=�6�!�lYx���U '%t�[
�|w�;+�s2�<�}���d�:�8^�4T)Za�T+�=.X^�x+��q�Λ��u��+Z���`�6��9�^��.i�����Hw��ݎ�9��Mc1��$wm"��̝q����<u�zs�N�nʽ�'V�T���%���S���)�W)��_�5��
P����K2�.�~�t9�gC�KIz��}j-��US�&�u�Ǫ+`�*�v�R̟{ٶbX#ٷ��ĀL�4D޷��z��}Z��X��ha6(}������t��SP��4}�0.(�����_�w�f�h��W��3����L��?����ʂ��eZ����m#�*L��y��
� ���=y��:Z&�k�6_�+)�o(�	$�/G�X0�ݼ�Y>���	�y�*lS쫯%�c��G�u�����/{ׂ�MԀڋ�@뀣�ƆД�@<��j�)
��.w;u7SU̙���D ����o'�S�JO�z��U��&N��bb��6[���z
�::G}���v�\*N0�����&�F�G� \:�`d���@5�U��ׂ1�]��?����R���ċ��w]��D6U�o������>��ۉ0R��	���!ݭ��rͪ0H�
=�'C��#���TM��A�������l#������1^3�i�zO�궐�dN`آکw�}�Ȳ"�֕ɳ��0D�LӨⴕ��Ǎ|�2�r�1��'��TE8��k��^��"o�ՒM��� ^��e="p�e��|�+T�80^Ҋ��\�m�\�ЎTO`<d`r�cYF�-(���;���aD[��'��e��E<oX�ܗГN)%��\��(��h�n���ljȢ뱫���0���n��Fa�G�ˢFY��]~�Zk�.���6���M����0Y.&q�Qw�Ll�y�?Ժ���<�5�)��[�m��>l��Ce�D|y?:M���\O��Χ5�<���(�����E��	���4x+�t�<z����C�7��r<��x��\�3��e�*i�9������l�v=o��ޠqZF�tw�@k���Ӕg���H�v�r�d��?[wܣW��Z��a\��
N�->;qP���rQa,@wM�~�������UY���t���T������;�v�~�ֺ`��V���x`1˻��ؘ�M����zo6S�b�$O�k�W5x{�H>���O��9�^</~:<�A ����|��U���iް���BS:$�5���ge	cۓ��9��'����m�1;���01v��%�i�}�5�X@�V���=.�<����k9VE#�����N��~_t�Z�!r�rҫ���5��e9Qr������3a�
30[D�:��Np�,�u��������C!7?������$�τa2զ�!.��"��t�>f߽wd��><{W7����"b3|���=�Z�̒K/�C(8q��j��`\ث�hbMa\a�z�ƽ\A���eBW����3EnSi�?�@Q~A��C_�l���^�r�F=s��F��\��m��|���Z."J��~G�׭�R�_Z�B��0������Jt�����+V���'1X���y�k���M{�8z+��{���T�����qer�o�vٗ/8��G�O�X�K�J&l�P �X�#�� >k�?�7%���[V�0t���($�s�+jr=:T[���M�؜�A�G�>C���n�V̌3�Q_&S��>���-2�!s^s��f��GW�j�&� F��Y)�uW"��ܽ�B%6*0�Vàϔ��X�_ 6\0tU�)�nh���8�0��i�W�� �@G
����&�T�l��b�M{d/+&#�SDFUڅ�(�˲�N���I 0o��/)�x��%�Ù�����jI�7`���(X����Ļ��=X� ��(9�QI�OU�!ܯI��v�yB��w/��n߻���Vw�X�+k��_}�|֟Z�;+�`Ͻ�i��n���f.:s�e�Y4�	"H��NV��Q�e{����8z{΍�Zy����YNyc9�aE4A�q�����9�5������\��T�%�V�3\����his�j_��b����9��=���1/@@q�$(�B����:f��Pܦ��(������k���}Om-��x�%��P3j��@�~��U�mN��6�Z?zS�;�."fru3I������hϊ�[Z��C��LD�Gn`�eq�~�e�k�0�㦹n�ĳ��N�F,�r�S�r�Į�a�]M��&#G�n��T���N]#6�٘ӽܠ̇������CЉ ]��Y�Ӻ�F��4^Ĉ2^�?�n�?_,מJ�!�gB<툂)���Z�5�ﰚ���<��[�/�����G6n�8]K��b0��-��
&QՅ�`x��N��νi����Q�֏V�_�?F3|��o\����Ќ�A����Z�x$h��f1���/�[�������A��VVu�����Orȸ�t���24X�߇����MP��J���s��c�����V�UmM����������wE���QX*��P���@(%0L�H���w�]��YnT£��s#� ����P�<8 a�f ����2BU8�b �uI#�7;��a\�z
�&��g�Yϧ���Z
�_��#_�Lފ���m+��I�B��Ss��{�|ݕ��fg��x�V��O_k��Q+���3�]˚�3	�yӭo�/�T��X�6iW������y�R��-�J ��#����,\.�y������[�$�[XwHL�>7��J�:�~/$CJ���0��+y!�\�@�V�T<Mp�9��so-�f��v_����Z���\?H�T�$!�`G;�O8�q�����.p�([�vZ��W�Q��j��m���@�WjV8�e$б��;�A�~���=�À�ݭ�^E����9ڪhS�hQ��k��~e�]᦭_� 	Hg ���^B�K��s3�$h*i��q��x6jy%��Up�/A���H�u} p��:�,�d�!OR���|�{|+�AU��u���n<K��q��jP>��<6���#�G�{<K���v�{��牨Ǖ�1A�s���~:�ն�� >  �d=��im�1s;�e�v��P�n+�|���}��:�`��ܭx���r\�/~&x]ig%
@Q����%���5�-��U2��O�U�k�g�ו��7m٘Cm8��h�U�8��ǜʚ�h�'b����9C{N�kA�.��Y�Ĺ<�<�(OE8�������!���Ñ��Sτ;�g8�V�jOz��uz��Cu����Lt���Dd.;�� a��I�=��}~OH��4�5F�eQ"Bz�~NM� U�H^[�U��7 �~U��Q�9�}��WE�M!�Q]/�寊t�m����q���S�^	J�(�����%�CȞ�������=YqGw�� &VP��EX�O�pG�g|2^W v$A-��8�~Ʈ3I95k�x����)��B��	bI��� $�ۋrqa�xĕ����.HG��A(i�=�NbA�1;l�>G�³�<l}��w��
��!���Z�s*��$g� �����S�A����u�Z�����i���h�$�:d--�H���!,;y��\�Ttϰ#�.�,,�;�EЋ�A"������"��%�9W�ȫˡ�1r�Y!�dt	5���$�X~zS�;�v��!5b8�W�_Oe"�T�Ԧqp���.x�E�L?��uX2�z�IZ�+��^=��kw��͹�qG�2�ց�Yo���zˊRl�Vg2�qGÖYƗ�t�s��Y
��c-�N�T]��k���u�Q�!�n�FY@����ƋSМ��B��]�4 ��"���բ�9P�0D��Y��w\)���hԙ}.#�FU|��(;���m�H����i��ƨsaי�T���b*@Kq��Y�0�S(���wx�:��:Wm��L/�	@�;0	��c6If']����X/Q�7G{��|Fdd܋�z�0�D��	`�s�X�v�<�k��Pz��&���C�Nu>�Wl��_�� ��@����D%lq7c�`ИN�l��[�[F�w̝��$E2�X����'f�e{����"QÅIy��CdF����ʽ�����'���s�+F�n�ҖT�� 08��rz[�B�6�x�в�E�{��L����=�(}�A��,'�
��cV#spw�c�LtN@�H��:�>9ո�ϒ_Ð�c9�보�H�H;ixh�O���lt���Z� "�Ը;�<PL�'K�j)�M�%$��.�j���%��;mH룔�KB%��U{�a���l�B��Vh!u����Q���j�J�
u#X�U{�m�߈���x@e��������x+V��͗�zĽAN/^��Y%N7�r<����߷d��Y��׌y��n��aByr�A}L�Mh8�@����f�F�<�Z��0���d��@΃.��ڃNz���b�h��{�}��i�Z�ʡ���@P!��đ0�aq,s��3P�����U�Vɢ����O��@A`��d9{�g�&I��!���K9�k�p�wj��ض�4��²�'M��!쑙o|�ͧ�i63�,�^<��X����+_{a��0G^{mL.2���3U_�V`��{�G�����wШ�U'�*1;��u۾y�-0�,�oA(<�	-}�.\(;��Iä�C�5��GV�]���켇�	U"GD�������`�M����� NV���@��Fʽ!�p�bi|�{��nx2(�W�mA[��F�h��I�-H�s걹p�/S鷠[k����K�n�\˱��|��R�6��4�ӉH�b=XP(>4�i�ף��֗������u��!�x���m��}U�Lگ�"�����pDd�Q���s�wbw���QT�N�K�2�	��''�h� Ng��Yձ�w"E��U�\Cb��T"�D���x��'�$I,c��=��4z�RR��e0�����I�s�:�y�	�:��/)�Sc�9~��cu$�ޓ���F{�G�ȏ���<��n�l0^��ݠ]�-��9+k�eH��>-�Mj�韆N��u�r���-�	�v���Y
8&��i��'�A�@��IW���D����j�u	����iI:�y����P�gV��4VT{�c��*P~=��D��a�����i�I��N������\�,6���ii�5=��H��fp�~����m����3�S&a�J�<G����h�D��m��f��CW�������̓Q�k�DW�ˀ����:��Q9߹�G��B�!�U��B���5�~�L�3�x-�T@0>��W/��ى�m	+\4�Ĕ� ����&�DA��Ǖ<�mp��t�g�Cg�a[��qY9�s��Oj��c����f1{��;(C+�f7}+�ܽ<�o\-�����|�FO�P��MA���W[:�:u�4�#���R�}S�ڊ�����&=�`Ԋ���JePu�p��LQ���-�`)��@T��utS�9C�W� S���T�{��tdfq��?�7RSG��e	�[u�M�1��o�)�:�4GO ˑQ���7�	w�}���U�jp8�EY�֓�^@�:
��u}�~��Ӡ�LV&&�H�;ew'��b*]��+*����.� %>�`�jy��ϮH�N�%?�����
��=s7��PӁ�P�m]3hxV`D�����8��D=Id~9G��n��2�d��i�Z�8b��=���F?�+�d}fŞs�W{�@5�����;̢���3kAO&�g�UѲSZ��,�WW�.�9@��pJ�K��F�Q��E^�L=F�Fv�fVD?�u�J��/�a�&�Y( >�k@Z�w+VE�P�����[f�Wm8��F��n�
;A����;�� M�S\�9�L��}8w�����a��J�4�;s=�㝀�n��I_��ᷣ�5wgv~$_��6ŗR~-���[� �����b���d%Cd.R������CR]�لQ�:��G�"(�w���P�����M�V���+��:����C�8�!�GW��N�<��0N�t�~���O"+`���J4>�o�M�O��;�����c��X�p)6�����֧���^�'� �iѥdnv��@��v�z g��=p��ة��v�B��EQ�j���E�n���"��j1��zz�(U�w`�?����k��a��"�{Q�hփ�����?`Zk}
��<4Y�W���`,�xC�qM|�i^�a��?����ͼ��l�#�O�,�v���ĳ�\9��� θ���BtEW�yn-�ɏ� ���	v���
�!�`��d	�#ɘÑ�:�a��2�묟��9�i@�W���ͷ���M�af�[v�>q��,N�Q�t�B��2:и���?����`��/^��q}r�     