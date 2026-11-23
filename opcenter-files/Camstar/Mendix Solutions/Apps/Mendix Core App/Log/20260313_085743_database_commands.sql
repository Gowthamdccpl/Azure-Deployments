EXEC sp_rename '[excr_commons$menucontext].[showmenu]', 'showmenuitems', 'COLUMN';
GO
ALTER TABLE [excr_commons$menucontext] ADD [showhamburgerbutton] bit NULL;
GO
UPDATE [excr_commons$menucontext] SET [showhamburgerbutton] = 0;
GO
INSERT INTO [mendixsystem$attribute] ([id], [entity_id], [attribute_name], [column_name], [type], [length], [default_value], [is_auto_number]) VALUES ('64515994-1ac1-4bea-9c05-5f1ad080ca37', '69728f72-a57e-4e37-8fe8-bc9faad7e457', 'ShowHamburgerButton', 'showhamburgerbutton', 10, 0, 'false', 0);
GO
UPDATE [mendixsystem$attribute] SET [entity_id] = '69728f72-a57e-4e37-8fe8-bc9faad7e457', [attribute_name] = 'ShowMenuItems', [column_name] = 'showmenuitems', [type] = 10, [length] = 0, [default_value] = 'false', [is_auto_number] = 0 WHERE [id] = '0a373e21-8b7e-4637-ac2f-4c47f6688600';
GO
CREATE TABLE [excr_operatorlog$doc] (
	[id] bigint NOT NULL,
	[filepath] nvarchar(200) NULL,
	[filename] nvarchar(200) NULL,
	[comments] nvarchar(200) NULL,
	PRIMARY KEY([id]));
GO
INSERT INTO [mendixsystem$entity] ([id], [entity_name], [table_name], [superentity_id], [remote], [remote_primary_key]) VALUES ('d3d8e7df-c160-4db2-9f59-0541efbc663f', 'EXCR_OperatorLog.Doc', 'excr_operatorlog$doc', '170ce49d-f29c-4fac-99a6-b55e8a3aeb39', 0, 0);
GO
INSERT INTO [mendixsystem$attribute] ([id], [entity_id], [attribute_name], [column_name], [type], [length], [default_value], [is_auto_number]) VALUES ('85b2aa3a-3bd2-4072-89bf-d828d76bcc6a', 'd3d8e7df-c160-4db2-9f59-0541efbc663f', 'FilePath', 'filepath', 30, 200, '', 0);
GO
INSERT INTO [mendixsystem$attribute] ([id], [entity_id], [attribute_name], [column_name], [type], [length], [default_value], [is_auto_number]) VALUES ('18353879-ec88-40fa-acd7-92cb95d07702', 'd3d8e7df-c160-4db2-9f59-0541efbc663f', 'FileName', 'filename', 30, 200, '', 0);
GO
INSERT INTO [mendixsystem$attribute] ([id], [entity_id], [attribute_name], [column_name], [type], [length], [default_value], [is_auto_number]) VALUES ('82e6a7d7-82fa-44d4-813a-cbdb7b49334d', 'd3d8e7df-c160-4db2-9f59-0541efbc663f', 'Comments', 'comments', 30, 200, '', 0);
GO
UPDATE [mendixsystem$version] SET [versionnumber] = '4.2', [lastsyncdate] = '20260313 08:57:41';
GO
