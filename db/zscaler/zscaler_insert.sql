
BEGIN;
INSERT INTO public.computer_group (id, name) VALUES ('6ca24248-9bbb-4fce-be3d-7553678d00c2','external_group');
INSERT INTO public.computer (id, name, ip, group_id) VALUES ('6ca24248-9bbb-4fce-be3d-7553678d00c1','sarthak-pc','192.0.2.143','6ca24248-9bbb-4fce-be3d-7553678d00c2');


INSERT INTO public.computer_group (id, name) VALUES ('5ca24248-9bbb-4fce-be3d-7553678d00c2','external_group');
INSERT INTO public.computer (id, name, ip, group_id) VALUES ('5ca24248-9bbb-4fce-be3d-7553678d00c1','mjangid-pc','192.0.2.141','5ca24248-9bbb-4fce-be3d-7553678d00c2');


insert into policy (computer_name,allowed_ip,policy_type) values ('sarthak-pc','190.0.2.143', 'computer_policy')


select * from computer_group a, computer b where a.id = b.group_id

END;
